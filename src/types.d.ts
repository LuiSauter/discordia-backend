import { Section } from './enums'

export interface User {
  username: string
  email: string
  photoUrl: string
  about: string
  servers: string[]
  channels: string[]
}

export interface Server {
  serverName: string
  users: string[]
  admin: string[]
  channels: string[]
}

export interface Channel {
  serverId: string
  channelName: string
  section: Section
  messages: string[]
  owner: string[]
}

export interface Message {
  message: string
  author: string
  channelId: string
}
/** other method ignore in typescript */
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
// export type NonSensitiveInfoMessage = Omit<Message, 'comment'>
// export type NewMessageEntry = Omit<DiaryEntry, 'id'>
