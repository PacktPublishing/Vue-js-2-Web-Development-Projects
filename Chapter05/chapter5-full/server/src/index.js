import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import express from 'express'
import passport from 'passport'
import session from 'express-session'
import cors from 'cors'
import uuid from 'uuid/v4'

import './auth'

import routes from './routes'

const PORT = process.env.PORT || 3000
const SECRET = process.env.SECRET || 'TR7_9cDZ5Re-@lT3Z1|58F'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:8080'

const corsOptions = {
  origin: CLIENT_ORIGIN,
  credentials: true,
}

const app = express()

app.use(cors(corsOptions))

app.use(cookieParser(SECRET))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(session({
  genid: () => uuid(),
  secret: SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production',
  },
}))

app.use(passport.initialize())
app.use(passport.session())


routes(app)

app.listen(PORT, () => {
 console.log(`Server listening on port ${PORT}`)
})
