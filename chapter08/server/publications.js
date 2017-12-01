import { Meteor } from 'meteor/meteor'
import { Measures } from '../lib/collections'

Meteor.publish('measures', function () {
  return Measures.find({})
})
