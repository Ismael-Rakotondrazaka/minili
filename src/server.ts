import { app } from './app'
import { connectDb } from './config/mongo'
import { connectCache } from './config/redis'

const PORT = Number(process.env.PORT) || 3000
const HOST = "0.0.0.0"

async function start() {
  await connectDb()
  await connectCache()
  app.listen(PORT, HOST, () => {
    console.log(`minili running on ${HOST}:${PORT}`)
  })
}

start().catch(console.error)
