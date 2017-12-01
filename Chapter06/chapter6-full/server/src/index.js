import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import uuid from 'uuid/v4'
import http from 'http'
import SocketIo from 'socket.io'
import socket from './socket'
import NedbStore from 'nedb-session-store'
import path from 'path'
import PassportSocketIo from 'passport.socketio'

import './auth'

import routes from './routes'

import { CLIENT_ORIGIN, SECRET, PORT, DB_PATH } from './config'

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
}

const NedbSessionStore = NedbStore(session)
const sessionStore = new NedbSessionStore({
  filename: path.join(DB_PATH, 'session-store.db')
})

const app = express()
const server = http.Server(app)

app.use(cors(corsOptions))

app.use(cookieParser(SECRET))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  genid: () => uuid(),
  key: 'express.sid',
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
  store: sessionStore,
}))

app.use(passport.initialize())
app.use(passport.session())


routes(app)

server.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`)
})

const io = SocketIo(server)

io.use(PassportSocketIo.authorize({
  cookieParser,
  key: 'express.sid',
  secret: SECRET,
  store: sessionStore,
  success: (data, accept) => {
    console.log('socket.io auth success')
    accept()
  },
}))

socket(io)
