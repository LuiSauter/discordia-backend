import { RequestHandler } from 'express'
import UserModel from '../models/user'
import escapeStringRegexp from 'escape-string-regexp'

export const login: RequestHandler = async (req, res) => {
  const isUser = await UserModel.findOne({ email: req.body.email })
  if (isUser === null) {
    try {
      const newUser = new UserModel(req.body)
      await newUser.save()
      res.status(201).json({ status: 'Successful registration' })
    } catch (error) {
      console.error(error)
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
    })
      .populate({
        path: 'channels',
        populate: { path: 'owner', select: 'username photoUrl' }
      })
      .populate({
        path: 'servers',
        populate: { path: 'channels', select: 'channelName section serverId' }
      })
    res.status(200).json(user)
  } catch (error) {
    console.error(error)
    res.sendStatus(406)
  }
}

export const searchUser: RequestHandler = async (req, res) => {
  try {
    const { username } = req.params
    if (username !== 'undefined' || String(username) !== '') {
      const words = escapeStringRegexp(username)
      const results = await UserModel.find({
        username: { $regex: '.*' + words + '.*', $options: 'i' },
        function (error: any, response: any) {
          return error != null ? console.error(error) : response
        }
      })
      res.status(200).json(results)
    } else {
      res.sendStatus(406)
    }
  } catch (error) {
    res.sendStatus(406)
  }
}

export const getAllUsers: RequestHandler = async (_req, res) => {
  try {
    const users = await UserModel.find({}).select(
      'username photoUrl createdAt channels'
    )
    res.status(200).json(users)
  } catch (error) {
    console.error(error)
    res.sendStatus(204)
  }
}
