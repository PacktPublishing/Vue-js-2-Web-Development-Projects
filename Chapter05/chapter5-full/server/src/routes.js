import passport from 'passport'
import { initData } from './providers'
import * as Users from './connectors/users'
import * as Questions from './connectors/questions'
import * as Tickets from './connectors/tickets'

initData()

function privateRoute (req, res, next) {
  if (!req.user) {
    res.status(403).send('Unauthorized')
  } else {
    next()
  }
}

function sendUserInfo (req, res) {
  res.json({
    _id: req.user._id,
    username: req.user.username,
  })
}

export default function (app) {
  app.get('/questions', async (req, res) => {
    const result = await Questions.getAll()
    setTimeout(() => {
      res.json(result)
    }, 1500)
  })

  app.post('/signup', async (req, res) => {
    try {
      if (req.user) {
        throw Error('Unauthorized')
      } else {
        const newDoc = await Users.createUser({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        })
        res.json({ status: 'ok' })
      }
    } catch (e) {
      res.status(403).send(e.message)
    }
  })

  app.post('/login', (req, res, next) => {
    if (req.user) {
      res.status(403).send('Unauthorized')
    } else {
      next()
    }
  }, passport.authenticate('local', {
    failWithError: true,
  }), (req, res) => {
    sendUserInfo(req, res)
  }, (err, req, res, next) => {
    res.status(403).send(err)
  })

  app.get('/user', (req, res) => {
    if (!req.user) {
      res.send('null')
    } else {
      sendUserInfo(req, res)
    }
  })

  app.get('/logout', (req, res) => {
    req.logout()
    res.json({ status: 'ok' })
  })

  app.get('/tickets', privateRoute, async (req, res) => {
    const result = await Tickets.getAll({
      user: req.user,
    })
    res.json(result)
  })

  app.post('/tickets/new', privateRoute, async (req, res) => {
    const result = await Tickets.create({
      user: req.user,
    }, req.body)
    res.json(result)
  })

  app.get('/ticket/:id', privateRoute, async (req, res) => {
    const result = await Tickets.getById({
      user: req.user,
    }, req.params.id)
    res.json(result)
  })
}
