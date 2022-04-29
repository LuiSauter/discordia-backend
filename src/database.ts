import mongoose from 'mongoose'
import config from './config/config'

const connectionString: string = config.MONGO_URI

if (connectionString === '') {
  throw new Error(
    'Please define the MONGO_URI environment variable inside in .env'
  )
}

export default async function connectDb (): Promise<void> {
  await mongoose.connect(connectionString)
}
mongoose.connection.once('open', () => {
  console.log('Database mongoDB connection stablished')
})

mongoose.connection.on('error', (error) => {
  console.error(error)
  process.exit(0)
})

connectDb().catch(console.error)
