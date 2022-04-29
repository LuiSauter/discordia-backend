import app from './app'
import config from './config/config'
import './database'
const PORT: string | number =
  process.env.NODE_ENV === 'development' ? 3000 : config.PORT

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
