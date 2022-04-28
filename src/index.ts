import express from 'express' // ESModules
import config from './config/config'
import { htmlHome } from './config/htmlHome'
import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json())

const PORT: string | number = process.env.NODE_ENV === 'development'
  ? 3000
  : config.PORT

app.get('/', (_req, res) => {
  res.send(htmlHome)
})

app.use('/api/discordia/', diaryRouter)

console.log(process.env.NODE_ENV, 'exact', process.env.PORT)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
