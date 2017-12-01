let cards = [
  {
    id: 'pikemen',
    type: 'attack',
    title: 'Pikemen',
    description: 'Spend 1 <b>Food</b><br>Deal 1 <b>Damage</b>',
    note: 'Send your disposable men to a certain death.',
    play (player, opponent) {
      player.food -= 1
      opponent.health -= 1
    },
  },
  {
    id: 'catapult',
    type: 'attack',
    title: 'Catapult',
    description: 'Spend 2 <b>Food</b><br>Deal 2 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 2
      opponent.health -= 2
    },
  },
  {
    id: 'trebuchet',
    type: 'attack',
    title: 'Trebuchet',
    description: 'Spend 3 <b>Food</b><br>Take 1 <b>Damage</b><br>Deal 4 <b>Damage</b>',
    note: ' &#171;The finest machine Man ever created!&#187;',
    play (player, opponent) {
      player.food -= 3
      player.health -= 1
      opponent.health -= 4
    },
  },
  {
    id: 'archers',
    type: 'attack',
    title: 'Archers',
    description: 'Spend 3 <b>Food</b><br>Deal 3 <b>Damage</b>',
    note: '&#171;Ready your bows! Nock! Mark! Draw! Loose!&#187;',
    play (player, opponent) {
      player.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'knighthood',
    type: 'attack',
    title: 'Knighthood',
    description: 'Spend 7 <b>Food</b><br>Deal 5 <b>Damage</b>',
    note: 'Knights may be even more expansive than their mount.',
    play (player, opponent) {
      player.food -= 7
      opponent.health -= 5
    },
  },
  {
    id: 'repair',
    type: 'support',
    title: 'Repair',
    description: 'Repair 5 <b>Damage</b><br>Skip your next turn',
    play (player, opponent) {
      player.skipTurn = true
      player.health += 5
    }
  },
  {
    id: 'quick-repair',
    type: 'support',
    title: 'Quick Repair',
    description: 'Spend 3 <b>Food</b><br>Repair 3 <b>Damage</b>',
    note: 'This is not without consequences on the moral and energy!',
    play (player, opponent) {
      player.food -= 3
      player.health += 3
    }
  },
  {
    id: 'farm',
    type: 'support',
    title: 'Farm',
    description: 'Gather 5 <b>Food</b><br>Skip your next turn',
    note: '&#171;One should be patient to grow crops.&#187;',
    play (player, opponent) {
      player.skipTurn = true
      player.food += 5
    },
  },
  {
    id: 'granary',
    type: 'support',
    title: 'Granary',
    description: 'Gather 2 <b>Food</b>',
    play (player, opponent) {
      player.food += 2
    }
  },
  {
    id: 'poison',
    type: 'special',
    title: 'Poison',
    description: 'Spend 1 <b>Food</b><br>Your opponent lose 3 <b>Food</b>',
    note: 'Send someone you trust poison the enemy granary.',
    play (player, opponent) {
      player.food -= 1
      opponent.food -= 3
    },
  },
  {
    id: 'fireball',
    type: 'special',
    title: 'Fireball',
    description: 'Take 3 <b>Damage</b><br>Deal 5 <b>Damage</b><br>Skip your turn',
    note: '&#171;Magic isn\'t for kids. You fool.&#187;',
    play (player, opponent) {
      player.health -= 3
      player.skipTurn = true
      opponent.health -= 5
    },
  },
  {
    id: 'chapel',
    type: 'special',
    title: 'Chapel',
    description: 'Do nothing',
    note: 'Pray in the chapel, and hope someone will listen.',
    play (player, opponent) {
      // Nothing happens...
    },
  },
  {
    id: 'curse',
    type: 'special',
    title: 'Curse',
    description: 'Everyone:<br>Lose 3 <b>Food</b><br>Take 3 <b>Damage</b>',
    play (player, opponent) {
      player.food -= 3
      player.health -= 3
      opponent.food -= 3
      opponent.health -= 3
    },
  },
  {
    id: 'miracle',
    type: 'special',
    title: 'Miracle',
    description: 'Everyone:<br>Gather 3 <b>Food</b><br>Repair 3 <b>Damage</b>',
    play (player, opponent) {
      player.food += 3
      player.health += 3
      opponent.food += 3
      opponent.health += 3
    },
  },
]

cards = cards.reduce((map, card) => {
  card.description = card.description.replace(/\d+\s+<b>.*?<\/b>/gi, '<span class="effect">$&</span>')
  card.description = card.description.replace(/<b>(.*?)<\/b>/gi, (match, p1) => {
    const id = p1.toLowerCase()
    return `<b class="keyword ${id}">${p1} <img src="svg/${id}.svg"/></b>`
  })
  map[card.id] = card
  return map
}, {})

let pile = {
  pikemen: 4,
  catapult: 4,
  trebuchet: 3,
  archers: 3,
  knighthood: 3,
  'quick-repair': 4,
  granary: 4,
  repair: 3,
  farm: 3,
  poison: 2,
  fireball: 2,
  chapel: 2,
  curse: 1,
  miracle: 1,
}
