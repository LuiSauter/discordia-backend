import { RequestHandler } from 'express'

export const allServers: RequestHandler = async (_req, res) => {
  try {
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const getServer: RequestHandler = async (_req, res) => {
  try {
    res.sendStatus(204)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const createServer: RequestHandler = async (_req, res) => {
  try {
    res.sendStatus(201)
  } catch (error) {
    res.sendStatus(406)
  }
}

export const deleteServer: RequestHandler = async (_req, res) => {
  try {
    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(406)
  }
}
