import EventEmitter from 'events'
import geolib from 'geolib'
import * as Users from './users'
import { Posts } from '../providers'

export const events = new EventEmitter()

export function getAll () {
  return Posts.find({})
}

export async function getAllInside (polygon) {
  const posts = await getAll()
  return posts.filter(post => geolib.isPointInside({
    latitude: post.position.lat,
    longitude: post.position.lng,
  }, polygon)).map(post => ({
    _id: post._id,
    position: post.position,
    placeId: post.placeId,
  }))
}

export async function getById (id) {
  const post = await Posts.findOne({
    _id: id,
  })
  const author = await Users.getById(post.user_id)
  post.author = {
    _id: author._id,
    profile: author.profile,
  }
  for (const comment of post.comments) {
    const author = await Users.getById(comment.user_id)
    comment.author = {
      _id: author._id,
      profile: author.profile,
    }
  }
  return post
}

export async function toggleLike ({ user }, id) {
  const post = await Posts.findOne({
    _id: id,
  })
  const index = post.likes.indexOf(user._id)
  if (index === -1) {
    post.likes.push(user._id)
  } else {
    post.likes.splice(index, 1)
  }
  await Posts.updateOne({
    _id: id,
  }, {
    $set: {
      likes: post.likes,
    },
  })
  events.emit(index === -1 ? 'like' : 'unlike', id, user._id)
}

export async function addComment({ user }, id, { content }) {
  const newComment = {
    content,
    user_id: user._id,
    date: new Date(),
  }
  await Posts.updateOne({
    _id: id,
  }, {
    $push: {
      comments: newComment,
    },
  })
  events.emit('comment', id, newComment)
}

export async function create ({ user }, {
  title,
  content,
  position,
  placeId,
}) {
  const post = await Posts.insert({
    title,
    content,
    position,
    placeId,
    comments: [],
    likes: [],
    user_id: user._id,
    date: new Date(),
  })
  events.emit('post', post)
  return post
}
