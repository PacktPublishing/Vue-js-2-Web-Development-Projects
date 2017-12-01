import passport from 'passport'
import { initData } from './providers'
import * as Users from './connectors/users'
import * as Posts from './connectors/posts'
import { CLIENT_ORIGIN } from './config'
import { holders } from './socket'

initData()

function privateRoute (req, res, next) {
  if (!req.user) {
    res.status(403).send('Unauthorized')
  } else {
    next()
  }
}

function sendUserInfo (req, res) {
  const { user } = req
  res.json({
    _id: user._id,
    profile: user.profile,
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
  })
}

export default function (app) {
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

  app.get('/auth/google', passport.authenticate(
    'google',
    {
      scope: ['https://www.googleapis.com/auth/plus.login'],
      display: 'popup',
    }
  ))

  app.get('/auth/google/callback', passport.authenticate(
    'google',
  ), (req, res) => {
    res.send(`<html>
    <body>
      <script>
        window.opener.postMessage('success', '${CLIENT_ORIGIN}')
        window.close()
      </script>
      Success!
    </body>
    </html>`)
  })

  app.get('/posts', privateRoute, async (req, res) => {
    const polygon = []
    const ne = req.query.ne.split(',')
    const sw = req.query.sw.split(',')
    // NE
    polygon.push({
      latitude: ne[0],
      longitude: ne[1],
    })
    // NW
    polygon.push({
      latitude: sw[0],
      longitude: ne[1],
    })
    // SW
    polygon.push({
      latitude: sw[0],
      longitude: sw[1],
    })
    // SE
    polygon.push({
      latitude: ne[0],
      longitude: sw[1],
    })

    const result = await Posts.getAllInside(polygon)
    console.log('posts', result)
    res.json(result)

    const holder = holders[req.user._id]
    holder && (holder.mapBounds = polygon)
  })

  app.post('/posts/new', privateRoute, async (req, res) => {
    const result = await Posts.create({
      user: req.user,
    }, req.body)
    res.json(result)
  })

  app.get('/posts/:id', privateRoute, async (req, res) => {
    const result = await Posts.getById(req.params.id)
    res.json(result)

    const holder = holders[req.user._id]
    holder && (holder.selectedPostId = req.params.id)
  })

  app.post('/posts/:id/like', privateRoute, async (req, res) => {
    await Posts.toggleLike({
      user: req.user,
    }, req.params.id)
    res.json({ status: 'ok' })
  })

  app.post('/posts/:id/comment', privateRoute, async (req, res) => {
    await Posts.addComment({
      user: req.user,
    }, req.params.id, req.body)
    res.json({ status: 'ok' })
  })
}
