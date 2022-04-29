import { RequestHandler } from 'express'
import UserModel from '../models/user'
import { User } from '../types'

export const login: RequestHandler = async (req, res) => {
  const newUser = new UserModel(req.body)
  const savedUser = await newUser.save()
  return res.status(201).json({ status: 'signin', savedUser })
}

export const getUser: RequestHandler = async (req, res) => {
  const user = await UserModel.findOne({
    username: req.params.username
  }).populate('channels')
  return res.status(200).json(user)
}

export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await UserModel.find({}).select('username photoUrl createdAt channels')
  return res.status(200).json(users)
}

export const deleteChannel: RequestHandler = async (req, res) => {
  const { userId, channelId } = req.params
  const user = await UserModel.findById(userId)
  const filterChannels: User | any = user?.channels.filter(
    (channel: string) => channel.toString() !== channelId
  )
  console.log(filterChannels)
  await UserModel.findByIdAndUpdate(userId, { channels: filterChannels }, { new: true })
  res.sendStatus(202)
}
