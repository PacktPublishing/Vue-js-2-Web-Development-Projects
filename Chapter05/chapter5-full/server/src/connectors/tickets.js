import { Tickets } from '../providers'
import * as Users from './users'

async function populateUser (ticket) {
  ticket.user = await Users.getById(ticket.user_id)
}

export async function getAll ({ user }) {
  const tickets = await Tickets.find({
    user_id: user._id,
  })
  await Promise.all(
    tickets.map(ticket => populateUser(ticket))
  )
  tickets.sort((a, b) => b.date.getTime() - a.date.getTime())
  return tickets
}

export async function getById ({ user }, id) {
  const ticket = await Tickets.findOne({
    user_id: user._id,
    _id: id,
  })
  if (ticket) {
    await populateUser(ticket)
  }
  return ticket
}

export function create ({ user }, { title, description }) {
  return Tickets.insert({
    title,
    description,
    user_id: user._id,
    date: new Date(),
    comments: [],
    status: 'new',
  })
}
