import { Schema, model } from 'mongoose'
import { Channel } from '../types'

const channelSchema = new Schema<Channel>({
  channelName: {
    type: String,
    trim: true
  },
  serverId: {
    type: Schema.Types.ObjectId,
    ref: 'Server'
  },
  section: String,
  messages: [{
    type: Schema.Types.ObjectId,
    ref: 'Message'
  }],
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }
  ]
}, { timestamps: true })

export default model<Channel>('Channel', channelSchema)
