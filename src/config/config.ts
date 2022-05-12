import dotenv from 'dotenv'
dotenv.config()

export default {
  PORT: process.env.PORT != null ? process.env.PORT : 3000,
  MONGO_URI: process.env.URI_CLUSTER_DB != null ? process.env.URI_CLUSTER_DB : '',
  NODE_ENV: process.env.NODE_ENV != null ? process.env.NODE_ENV : ''
}
