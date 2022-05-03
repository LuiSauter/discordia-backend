import { Visibility, Weather } from './enums'

export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

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
  rols: string[]
  channels: string[]
}

export interface Channel {
  serverId: string
  channelName: string
  section: string
  messages: string[]
  owner: string[]
}

export interface Message {
  message: string
  author: string
  channelId: string
}

// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>
