import * as Users from './connectors/users'
import * as Posts from './connectors/posts'

export const holders = {}

export default function (io) {
  io.on('connection', socket => {
    const user = socket.request.user
    console.log('new user socket', user)

    const holder = {
      socket,
      selectedPostId: null,
      mapBounds: null,
    }

    holders[user._id] = holder

    const listeners = {
      like (id, userId) {
        if (id === holder.selectedPostId) {
          socket.emit('like', userId)
        }
      },
      unlike (id, userId) {
        if (id === holder.selectedPostId) {
          socket.emit('unlike', userId)
        }
      },
      comment (id, newComment) {
        if (id === holder.selectedPostId) {
          socket.emit('comment', newComment)
        }
      },
      post (post) {
        if (geolib.isPointInside({
          latitude: post.position.lat,
          longitude: post.position.lng,
        }, holder.mapBounds)) {
          socket.emit('post', post)
        }
      },
    }

    for (const event in listeners) {
      Posts.events.on(event, listeners[event])
    }

    socket.on('unselect', () => {
      holder.selectedPostId = null
    })

    socket.on('disconnect', () => {
      for (const event in listeners) {
        Posts.events.removeListener(event, listeners[event])
      }
      delete holders[user._id]
    })
  })
}
