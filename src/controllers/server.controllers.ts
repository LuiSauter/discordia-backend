import { RequestHandler } from 'express'
import ServerModel from '../models/server'
import ChannelModel from '../models/channel'
import UserModel from '../models/user'
import MessageModel from '../models/message'

export const allServers: RequestHandler = async (_req, res) => {
  try {
    const servers = await ServerModel.find({})
    res.status(200).json(servers)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const getServer: RequestHandler = async (req, res) => {
  try {
    const server = await ServerModel.findById(req.params.id).populate('channels')
    res.status(200).json(server)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const createServer: RequestHandler = async (req, res) => {
  try {
    const { serverName, userId, image } = req.body
    console.log(req.body)
    const newServer = await ServerModel.create({
      serverName,
      users: [userId],
      admin: userId,
      channels: [],
      image
    })
    await newServer.save()
    const defaultChannelOne = await ChannelModel.create({
      channelName: 'bienvenida-y-reglas',
      serverId: newServer._id,
      section: 'información',
      messages: [],
      owner: [userId]
    })
    await defaultChannelOne.save()
    const defaultChannelTwo = await ChannelModel.create({
      channelName: 'general',
      serverId: newServer._id,
      section: 'canales de texto',
      messages: [],
      owner: [userId]
    })
    await defaultChannelTwo.save()

    const defaultChannelThree = await ChannelModel.create({
      channelName: 'Sala de estudio',
      serverId: newServer._id,
      section: 'canales de voz',
      messages: [],
      owner: [userId]
    })
    await defaultChannelThree.save()
    const update = {
      $push: {
        channels: [defaultChannelOne._id, defaultChannelTwo._id, defaultChannelThree._id]
      }
    }
    await UserModel.findByIdAndUpdate(userId, {
      $push: { servers: [newServer._id] }
    })
    await ServerModel.findByIdAndUpdate(newServer._id, update)

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.sendStatus(406)
  }
}

export const invitation: RequestHandler = async (req, res) => {
  try {
    const { serverId, userId } = req.params
    const isExistServer = await ServerModel.findById(serverId)
    const isExistUser = await UserModel.findById(userId)
    if (isExistServer !== null && isExistUser !== null) {
      await UserModel.findByIdAndUpdate(userId, {
        $push: { servers: serverId }
      })
      await ServerModel.findByIdAndUpdate(serverId, {
        $push: { users: userId }
      })
      console.log({ serverId, userId })
      res.sendStatus(202)
    } else {
      res.sendStatus(406)
    }
  } catch (error) {
    res.sendStatus(406)
  }
}

export const deleteServer: RequestHandler = async (req, res) => {
  try {
    const { myId, serverId } = req.params
    const findServer = await ServerModel.findById(serverId)
    if (findServer?.admin.toString() === myId) {
      // Delete all channelId of messages
      await MessageModel.deleteMany({ channelId: { $in: findServer?.channels } })
      // Delete all ids channel of server
      await ChannelModel.deleteMany({ _id: { $in: findServer?.channels } })
      // remove all ids of users on arrays servers
      await UserModel.updateMany({}, { $pull: { servers: serverId } })
      // Delete server
      await ServerModel.findByIdAndDelete(serverId)
      res.sendStatus(202)
    } else {
      res.sendStatus(406)
    }
  } catch (error) {
    res.sendStatus(406)
  }
}
