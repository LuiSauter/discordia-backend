import { RequestHandler } from 'express'
import UserModel from '../models/user'

export const login: RequestHandler = async (req, res) => {
  const isUser = await UserModel.findOne({ email: req.body.email })
  if (isUser === null) {
    try {
      const newUser = new UserModel(req.body)
      await newUser.save()
      res.status(201).json({ status: 'Successful registration' })
    } catch (error) {
      console.error(Error)
      res.sendStatus(406)
    }
  } else {
    res.status(202).json({ status: 'Login successfully' })
  }
}

export const getUser: RequestHandler = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      username: req.params.username
    }).populate('channels')
    res.status(200).json(user)
  } catch (error) {
    console.error(Error)
    res.sendStatus(406)
  }
}

export const getAllUsers: RequestHandler = async (_req, res) => {
  const users = await UserModel.find({}).select('username photoUrl createdAt channels')
  return res.status(200).json(users)
}
