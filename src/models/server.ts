import { Schema, model } from 'mongoose'
import { Server } from '../types'

const serverSchema = new Schema<Server>({
  serverName: {
    required: true,
    type: String,
    trim: true
  },
  users: {
    required: true,
    type: [String]
  },
  rols: {
    required: true,
    type: [String]
  },
  channels: {
    required: true,
    type: [String]
  }
})

export default model<Server>('Server', serverSchema)
