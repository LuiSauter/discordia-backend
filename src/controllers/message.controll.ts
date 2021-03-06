import { RequestHandler } from "express"
import MessageModel from "../models/message"
import ChannelModel from "../models/channel"
import UserModel from "../models/user"

export const test: RequestHandler = async (req, res) => {
  const { myId, yourId } = req.body
  try {
    const result = await ChannelModel.findOne({ owner: [myId, yourId] })
    console.log(result)
    res.status(200).json(result)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const getAllMessages: RequestHandler = async (_req, res) => {
  const allMessages = await MessageModel.find({})
  res.status(200).json(allMessages)
}

export const createMessage: RequestHandler = async (req, res) => {
  const { message, myId, yourId, channelId, serverId } = req.body
  if (channelId === undefined && serverId === undefined) {
    try {
      const isExist = await ChannelModel.findOne({ owner: [myId, yourId] })
      if (isExist === null) {
        // create channel
        const newChannel = await ChannelModel.create({ owner: [myId, yourId] })
        await newChannel.save()
        // create message
        const newMessage = new MessageModel({
          message: message,
          author: myId,
          channelId: newChannel._id,
        })
        await newMessage.save()
        // add channelId in users
        await UserModel.findByIdAndUpdate(myId, { $push: { channels: newChannel._id } })
        await UserModel.findByIdAndUpdate(yourId, { $push: { channels: newChannel._id } })
        // add messages in new channel
        await ChannelModel.findByIdAndUpdate(
          newChannel._id,
          { messages: [newMessage._id] },
          { new: true }
        )
        res.sendStatus(201)
      } else {
        res.sendStatus(406)
      }
    } catch (error) {
      console.error(error)
      res.sendStatus(406)
    }
  } else {
    try {
      const isExist = await ChannelModel.findById(channelId)
      if (isExist !== null) {
        const newMessage = new MessageModel({
          message,
          author: myId,
          channelId,
        })
        await newMessage.save()
        const filter = { $push: { messages: newMessage._id } }
        await ChannelModel.findByIdAndUpdate(channelId, filter)
        res.sendStatus(201)
      } else {
        res.sendStatus(406)
      }
    } catch (error) {
      res.sendStatus(406)
    }
  }
}

export const deleteMessage: RequestHandler = async (req, res) => {
  try {
    const { msgId, channelId } = req.params
    const isExistMsg = await MessageModel.findById(msgId)
    if (isExistMsg !== null) {
      try {
        const channel = await ChannelModel.findById(channelId)
        const filter = channel?.messages.filter((msgId: string) => msgId.toString() !== msgId)
        await ChannelModel.findByIdAndUpdate(channelId,{ messages: filter },{ new: true })
        await MessageModel.findByIdAndDelete(msgId)
        res.sendStatus(202)
      } catch (error) {
        console.log(error)
        res.sendStatus(406)
      }
    } else res.sendStatus(400)
  } catch (error) {
    res.sendStatus(406)
  }
}
