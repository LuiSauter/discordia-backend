import { Schema, model, Document } from 'mongoose'
import { Message } from '../types'

const messageSchema = new Schema<Message | Document>({
  message: {
    required: true,
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model<Message | Document>('Message', messageSchema)
