import { RequestHandler } from 'express'
import ChannelModel from '../models/channel'
import MessageModel from '../models/message'
import UserModel from '../models/user'

export const createChannel: RequestHandler = async (req, res) => {
  const { myId, yourId } = req.params
  const { message } = req.body

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
  return res.status(200).json('channel created successfully!')
}
