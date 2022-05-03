import { Schema, model } from 'mongoose'
import { Message } from '../types'

const messageSchema = new Schema<Message>(
  {
    message: {
      required: true,
      type: String
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    channelId: {
      type: Schema.Types.ObjectId,
      ref: 'Channel'
    }
  },
  { timestamps: true }
)

export default model<Message>('Message', messageSchema)
