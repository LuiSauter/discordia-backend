import { Schema, model } from 'mongoose'
import { User } from '../types'

const userSchema = new Schema<User>({
  username: {
    required: true,
    type: String,
    trim: true,
    unique: true
  },
  email: {
    required: true,
    type: String,
    trim: true,
    unique: true
  },
  photoUrl: {
    required: true,
    type: String
  },
  about: String,
  channels: [{
    type: Schema.Types.ObjectId,
    ref: 'Channel'
  }],
  servers: [{
    type: Schema.Types.ObjectId,
    ref: 'Server'
  }]
}, { timestamps: true })

export default model<User>('User', userSchema)
