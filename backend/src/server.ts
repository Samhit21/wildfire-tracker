import 'dotenv/config'
import { app } from './app.js'

const port = Number(process.env.PORT ?? 3001)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535')
}

const server = app.listen(port, () => {
  console.log(`Wildfire Monitor API listening on port ${port}`)
})

server.on('error', (error) => {
  console.error('Failed to start the API:', error.message)
  process.exitCode = 1
})