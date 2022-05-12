import express from 'express' // ESModules
import cors from 'cors'
import { htmlHome } from './config/htmlHome'
import userRoutes from './routes/user.routes'
import serverRoutes from './routes/server.routes'
import channelsRoutes from './routes/channel.routes'

const app = express()

app.use(cors({ origin: ['https://discordiaa.vercel.app', 'http://localhost:3000'], optionsSuccessStatus: 200 }))

app.use(express.json())

app.get('/', (_req, res) => {
  res.send(htmlHome)
})

app.use('/api/discordia/user', userRoutes)

app.use('/api/discordia/channel', channelsRoutes)

app.use('/api/discordia/server', serverRoutes)

export default app
