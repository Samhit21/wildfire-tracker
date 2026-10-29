import express from 'express'
import type { ErrorRequestHandler } from 'express'

export const app = express()

app.disable('x-powered-by')
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

const errorHandler: ErrorRequestHandler = (error, _req, res, next) => {
  if (res.headersSent) {
    next(error)
    return
  }

  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    res.status(400).json({ error: 'Invalid JSON' })
    return
  }

  console.error(error)
  res.status(500).json({ error: 'Internal server error' })
}

app.use(errorHandler)