import { Schema, model, Document } from 'mongoose'
import { Channel } from '../types'

const channelSchema = new Schema<Channel | Document>(
  {
    channelName: {
      type: String,
      trim: true
    },
    serverId: {
      type: Schema.Types.ObjectId,
      ref: 'Server'
    },
    section: String,
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message'
      }
    ],
    owner: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamps: true }
)

export default model<Channel | Document>('Channel', channelSchema)
