import { Questions } from '../providers'

export function getAll () {
  return Questions.find({})
}
