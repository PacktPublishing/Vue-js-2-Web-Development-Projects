import { Meteor } from 'meteor/meteor'
import { Measures } from './collections'

Meteor.methods({
  'measure.add' (measure) {
    Measures.insert({
      ...measure,
      date: new Date(),
    })
  },
})
