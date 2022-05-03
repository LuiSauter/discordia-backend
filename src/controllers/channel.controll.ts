import { RequestHandler } from 'express'
import ChannelModel from '../models/channel'
import MessageModel from '../models/message'
import UserModel from '../models/user'
import { Channel, User } from '../types'

export const getAllChannel: RequestHandler = async (_req, res) => {
  const allChannels = await ChannelModel.find({})
  res.status(200).json(allChannels)
}

export const getAllMessages: RequestHandler = async (_req, res) => {
  const allMessages = await MessageModel.find({})
  res.status(200).json(allMessages)
}

export const getChannel: RequestHandler = async (req, res) => {
  const channel = await ChannelModel.findById(req.params.id)
  res.status(200).json(channel)
}

export const createChannel: RequestHandler = async (req, res) => {
  const { myId, yourId } = req.params
  const { message } = req.body
  const channelExists = await ChannelModel.findOne({ owner: [myId, yourId] })
  if (channelExists !== null) {
    try {
      const sendMessage = new MessageModel({ message: message, author: myId })
      await sendMessage.save()
      const newChannel = await ChannelModel.create({
        ...req.body,
        owner: [myId, yourId],
        messages: [sendMessage._id]
      })
      await newChannel.save()
      await UserModel.findByIdAndUpdate(myId, {
        $push: { channels: newChannel._id }
      })
      await UserModel.findByIdAndUpdate(yourId, {
        $push: { channels: newChannel._id }
      })
      await MessageModel.findByIdAndUpdate(sendMessage._id, { channelId: newChannel._id }, { new: true })
      res.status(200).json({ status: 'channel created successfully!' })
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    res.sendStatus(406)
  }
}

export const deleteChannel: RequestHandler = async (req, res) => {
  const { userId, channelId } = req.params
  const user = await UserModel.findById(userId)
  const channel = await ChannelModel.findById(channelId)
  if (user === null || channel === null) res.sendStatus(406)
  try {
    const filterChannels: User | any = user?.channels.filter((channel: string) => channel.toString() !== channelId)
    const newOwner: Channel | any = channel?.owner.filter((ch: string) => ch.toString() !== userId)
    // delete userId of channel.owner
    await ChannelModel.findByIdAndUpdate(channelId, { owner: newOwner }, { new: true })
    // delete channelId of user.channels
    await UserModel.findByIdAndUpdate(userId, { channels: filterChannels }, { new: true })
    if (channel?.owner.length === 1) {
      await MessageModel.deleteMany({ channelId: channelId })
      await ChannelModel.findByIdAndDelete(channelId)
    }
    res.sendStatus(202)
  } catch (error) {
    res.sendStatus(406)
  }
}
