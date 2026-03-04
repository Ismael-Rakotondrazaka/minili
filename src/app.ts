import express from 'express'
import path from 'path'
import urlRoutes from './routes/url.routes'

export const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(urlRoutes)
