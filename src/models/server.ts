import { Schema, model } from 'mongoose'
import { Server } from '../types'

const serverSchema = new Schema<Server>(
  {
    serverName: {
      required: true,
      type: String,
      trim: true
    },
    users: [
      {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    admin: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    channels: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Channel'
      }
    ],
    image: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default model<Server>('Server', serverSchema)
