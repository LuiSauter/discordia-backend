import { RequestHandler } from 'express'
import ChannelModel from '../models/channel'
import MessageModel from '../models/message'
import UserModel from '../models/user'
import { Channel, User } from '../types'

export const getAllChannel: RequestHandler = async (_req, res) => {
  const allChannels = await ChannelModel.find({})
  res.status(200).json(allChannels)
}

export const getChannel: RequestHandler = async (req, res) => {
  const channel = await ChannelModel.findById(req.params.id).populate('messages owner')
  res.status(200).json(channel)
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
