import { Schema, model } from 'mongoose'
import { Server } from '../types'

const serverSchema = new Schema<Server>({
  serverName: {
    required: true,
    type: String,
    trim: true
  },
  users: [{
    required: true,
    type: Schema.Types.ObjectId,
  }],
  rols: {
    required: true,
    type: [String]
  },
  channels: [{
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }]
}, { timestamps: true })

export default model<Server>('Server', serverSchema)
