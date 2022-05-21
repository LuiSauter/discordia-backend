import { RequestHandler } from 'express'
import ServerModel from '../models/server'
import ChannelModel from '../models/channel'
import UserModel from '../models/user'

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
    console.log(req.body)
    const newServer = await ServerModel.create({
      serverName: req.body.serverName,
      users: [req.body.user],
      admin: req.body.user,
      channels: []
    })
    await newServer.save()
    const defaultChannelOne = await ChannelModel.create({
      channelName: 'bienvenida-y-reglas',
      serverId: newServer._id,
      section: 'información',
      messages: [],
      owner: [req.body.user]
    })
    await defaultChannelOne.save()
    const defaultChannelTwo = await ChannelModel.create({
      channelName: 'general',
      serverId: newServer._id,
      section: 'canales de texto',
      messages: [],
      owner: [req.body.user]
    })
    await defaultChannelTwo.save()

    const defaultChannelThree = await ChannelModel.create({
      channelName: 'Sala de estudio',
      serverId: newServer._id,
      section: 'canales de voz',
      messages: [],
      owner: [req.body.user]
    })
    await defaultChannelThree.save()
    const update = {
      $push: {
        channels: [defaultChannelOne._id, defaultChannelTwo._id, defaultChannelThree._id]
      }
    }
    await UserModel.findByIdAndUpdate(req.body.user, {
      $push: { servers: [newServer._id] }
    })
    await ServerModel.findByIdAndUpdate(newServer._id, update)

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    res.sendStatus(406)
  }
}

export const deleteServer: RequestHandler = async (req, res) => {
  try {
    const findServer = await ServerModel.findById(req.params.serverId)
    await ChannelModel.deleteMany({ _id: { $in: findServer?.channels } })
    await ServerModel.findByIdAndDelete(req.params.serverId)
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(406)
  }
}
