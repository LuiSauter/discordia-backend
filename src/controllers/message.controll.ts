import { RequestHandler } from 'express'
import MessageModel from '../models/message'
import ChannelModel from '../models/channel'
import UserModel from '../models/user'

export const getAllMessages: RequestHandler = async (_req, res) => {
  const allMessages = await MessageModel.find({})
  res.status(200).json(allMessages)
}

export const createMessage: RequestHandler = async (req, res) => {
  const { message, myId, yourId, channelId } = req.body
  if (channelId === undefined) {
    try {
      // create channel
      const newChannel = await ChannelModel.create({ owner: [myId, yourId] })
      await newChannel.save()
      // create message
      const newMessage = new MessageModel({ message: message, author: myId, channelId: newChannel._id })
      await newMessage.save()
      // add channelId in users
      await UserModel.findByIdAndUpdate(myId, {
        $push: { channels: newChannel._id }
      })
      await UserModel.findByIdAndUpdate(yourId, {
        $push: { channels: newChannel._id }
      })
      // add messages in new channel
      await ChannelModel.findByIdAndUpdate(newChannel._id, { messages: [newMessage._id] }, { new: true })
      res.sendStatus(201)
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    try {
      const newMessage = new MessageModel({ message, author: myId, channelId })
      await newMessage.save()
      const filter = { $push: { messages: newMessage._id } }
      await ChannelModel.findByIdAndUpdate(channelId, filter)
      res.sendStatus(201)
    } catch (error) {
      res.sendStatus(406)
    }
  }
}

export const deleteMessage: RequestHandler = async (req, res) => {
  const isExistMsg = await MessageModel.findById(req.params.msgId)
  if (isExistMsg !== null) {
    try {
      const channel = await ChannelModel.findById(req.params.channelId)
      const filter = channel?.messages.filter((msgId: string) => msgId.toString() !== req.params.msgId)
      await ChannelModel.findByIdAndUpdate(req.params.channelId, {messages: filter}, { new: true })
      await MessageModel.findByIdAndDelete(req.params.msgId)
      res.sendStatus(202)
    } catch (error) {
      console.log(error)
      res.sendStatus(406)
    }
  } else res.sendStatus(400)
}