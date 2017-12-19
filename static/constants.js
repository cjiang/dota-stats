// https://github.com/odota/dotaconstants/blob/master/build/patch.json
const PATCHES = [
  {
    'name': '6.70',
    'date': '2010-12-24T00:00:00Z'
  },
  {
    'name': '6.71',
    'date': '2011-01-21T00:00:00Z'
  },
  {
    'name': '6.72',
    'date': '2011-04-27T00:00:00Z'
  },
  {
    'name': '6.73',
    'date': '2011-12-24T00:00:00Z'
  },
  {
    'name': '6.74',
    'date': '2012-03-10T00:00:00Z'
  },
  {
    'name': '6.75',
    'date': '2012-09-30T00:00:00Z'
  },
  {
    'name': '6.76',
    'date': '2012-10-21T00:00:00Z'
  },
  {
    'name': '6.77',
    'date': '2012-12-15T00:00:00Z'
  },
  {
    'name': '6.78',
    'date': '2013-05-30T00:00:00Z'
  },
  {
    'name': '6.79',
    'date': '2013-11-24T00:00:00Z'
  },
  {
    'name': '6.80',
    'date': '2014-01-27T00:00:00Z'
  },
  {
    'name': '6.81',
    'date': '2014-04-29T00:00:00Z'
  },
  {
    'name': '6.82',
    'date': '2014-09-24T00:00:00Z'
  },
  {
    'name': '6.83',
    'date': '2014-12-17T00:00:00Z'
  },
  {
    'name': '6.84',
    'date': '2015-04-30T21:00:00Z'
  },
  {
    'name': '6.85',
    'date': '2015-09-24T20:00:00Z'
  },
  {
    'name': '6.86',
    'date': '2015-12-16T20:00:00Z'
  },
  {
    'name': '6.87',
    'date': '2016-04-26T01:00:00Z'
  },
  {
    'name': '6.88',
    'date': '2016-06-12T08:00:00Z'
  },
  {
    'name': '7.00',
    'date': '2016-12-13T00:00:00Z'
  },
  {
    'name': '7.01',
    'date': '2016-12-21T03:00:00Z'
  },
  {
    'name': '7.02',
    'date': '2017-02-09T04:00:00Z'
  },
  {
    'name': '7.03',
    'date': '2017-03-16T00:00:00Z'
  },
  {
    'name': '7.04',
    'date': '2017-03-23T18:00:00Z'
  },
  {
    'name': '7.05',
    'date': '2017-04-09T22:00:00Z'
  },
  {
    'name': '7.06',
    'date': '2017-05-15T15:00:00Z'
  },
  {
    'name': '7.07',
    'date': '2017-10-31T23:00:00Z'
  }
];

const KNOWN_ATTRIBUTES = [
  'str',
  'agi',
  'int',
  'Melee',
  'Ranged',
];

// http://wiki.teamliquid.net/dota2/Hero_Roles
const KNOWN_ROLES = [
  'Carry',
  'Nuker',
  'Initiator',
  'Disabler',
  'Durable',
  'Escape',
  'Support',
  'Pusher',
  'Jungler',
  'Complexity',
];

const ROLES = {
  'Abaddon': {
    'Carry': 1,
    'Complexity': 1,
    'Durable': 2,
    'Support': 2
  },
  'Alchemist': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 2,
    'Initiator': 1,
    'Nuker': 1,
    'Support': 1
  },
  'Ancient Apparition': {
    'Complexity': 2,
    'Disabler': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Anti-Mage': {
    'Carry': 3,
    'Complexity': 1,
    'Escape': 3,
    'Nuker': 1
  },
  'Arc Warden': {
    'Carry': 3,
    'Complexity': 3,
    'Escape': 3,
    'Nuker': 1
  },
  'Axe': {
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 3,
    'Initiator': 3,
    'Jungler': 2
  },
  'Bane': {
    'Complexity': 2,
    'Disabler': 3,
    'Durable': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Batrider': {
    'Complexity': 2,
    'Disabler': 2,
    'Escape': 1,
    'Initiator': 3,
    'Jungler': 2
  },
  'Beastmaster': {
    'Complexity': 2,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Bloodseeker': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Initiator': 1,
    'Jungler': 1,
    'Nuker': 1
  },
  'Bounty Hunter': {
    'Complexity': 1,
    'Escape': 2,
    'Nuker': 1
  },
  'Brewmaster': {
    'Carry': 1,
    'Complexity': 3,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 3,
    'Nuker': 1
  },
  'Bristleback': {
    'Carry': 2,
    'Complexity': 1,
    'Durable': 3,
    'Initiator': 1,
    'Nuker': 1
  },
  'Broodmother': {
    'Carry': 1,
    'Complexity': 2,
    'Escape': 3,
    'Nuker': 1,
    'Pusher': 3
  },
  'Centaur Warrunner': {
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 3,
    'Escape': 1,
    'Initiator': 3,
    'Nuker': 1
  },
  'Chaos Knight': {
    'Carry': 3,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 1,
    'Pusher': 2
  },
  'Chen': {
    'Complexity': 3,
    'Jungler': 3,
    'Pusher': 2,
    'Support': 2
  },
  'Clinkz': {
    'Carry': 2,
    'Complexity': 2,
    'Escape': 3,
    'Pusher': 1
  },
  'Clockwerk': {
    'Complexity': 2,
    'Disabler': 2,
    'Durable': 1,
    'Initiator': 3,
    'Nuker': 1
  },
  'Crystal Maiden': {
    'Complexity': 1,
    'Disabler': 2,
    'Jungler': 1,
    'Nuker': 2,
    'Support': 3
  },
  'Dark Seer': {
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 1,
    'Initiator': 1,
    'Jungler': 1
  },
  'Dazzle': {
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 1,
    'Support': 3
  },
  'Death Prophet': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 1,
    'Pusher': 3
  },
  'Disruptor': {
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Doom': {
    'Carry': 1,
    'Complexity': 2,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Dragon Knight': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 1,
    'Nuker': 1,
    'Pusher': 3
  },
  'Drow Ranger': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Pusher': 1
  },
  'Earth Spirit': {
    'Complexity': 3,
    'Disabler': 1,
    'Durable': 1,
    'Escape': 2,
    'Initiator': 1,
    'Nuker': 2
  },
  'Earthshaker': {
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 3,
    'Nuker': 1,
    'Support': 1
  },
  'Elder Titan': {
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Initiator': 2,
    'Nuker': 1
  },
  'Ember Spirit': {
    'Carry': 2,
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 3,
    'Initiator': 1,
    'Nuker': 1
  },
  'Enchantress': {
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Jungler': 3,
    'Pusher': 2,
    'Support': 2
  },
  'Enigma': {
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 2,
    'Jungler': 3,
    'Pusher': 2
  },
  'Faceless Void': {
    'Carry': 2,
    'Complexity': 2,
    'Disabler': 2,
    'Durable': 1,
    'Escape': 1,
    'Initiator': 3
  },
  'Gyrocopter': {
    'Carry': 3,
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 1
  },
  'Huskar': {
    'Carry': 2,
    'Complexity': 1,
    'Durable': 2,
    'Initiator': 1
  },
  'Invoker': {
    'Carry': 1,
    'Complexity': 3,
    'Disabler': 2,
    'Escape': 1,
    'Nuker': 3,
    'Pusher': 1
  },
  'Io': {
    'Complexity': 3,
    'Escape': 2,
    'Nuker': 1,
    'Support': 3
  },
  'Jakiro': {
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 2,
    'Pusher': 2,
    'Support': 1
  },
  'Juggernaut': {
    'Carry': 2,
    'Complexity': 1,
    'Escape': 1,
    'Pusher': 1
  },
  'Keeper of the Light': {
    'Complexity': 2,
    'Disabler': 1,
    'Jungler': 1,
    'Nuker': 2,
    'Support': 3
  },
  'Kunkka': {
    'Carry': 1,
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Initiator': 1,
    'Nuker': 1
  },
  'Legion Commander': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 1,
    'Initiator': 1,
    'Nuker': 1
  },
  'Leshrac': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 3,
    'Pusher': 3,
    'Support': 1
  },
  'Lich': {
    'Complexity': 1,
    'Nuker': 2,
    'Support': 3
  },
  'Lifestealer': {
    'Carry': 2,
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 2,
    'Escape': 1,
    'Jungler': 1
  },
  'Lina': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 3,
    'Support': 1
  },
  'Lion': {
    'Complexity': 1,
    'Disabler': 3,
    'Initiator': 2,
    'Nuker': 3,
    'Support': 2
  },
  'Lone Druid': {
    'Carry': 2,
    'Complexity': 3,
    'Durable': 1,
    'Jungler': 1,
    'Pusher': 3
  },
  'Luna': {
    'Carry': 2,
    'Complexity': 1,
    'Nuker': 2,
    'Pusher': 1
  },
  'Lycan': {
    'Carry': 2,
    'Complexity': 2,
    'Durable': 1,
    'Escape': 1,
    'Jungler': 1,
    'Pusher': 3
  },
  'Magnus': {
    'Complexity': 2,
    'Disabler': 2,
    'Escape': 1,
    'Initiator': 3,
    'Nuker': 1
  },
  'Medusa': {
    'Carry': 3,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 1
  },
  'Meepo': {
    'Carry': 2,
    'Complexity': 3,
    'Disabler': 1,
    'Escape': 2,
    'Initiator': 1,
    'Nuker': 2,
    'Pusher': 1
  },
  'Mirana': {
    'Carry': 1,
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 2,
    'Nuker': 1,
    'Support': 1
  },
  'Monkey King': {
    'Carry': 2,
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 2,
    'Initiator': 1
  },
  'Morphling': {
    'Carry': 3,
    'Complexity': 3,
    'Disabler': 1,
    'Durable': 2,
    'Escape': 3,
    'Nuker': 1
  },
  'Naga Siren': {
    'Carry': 3,
    'Complexity': 2,
    'Disabler': 2,
    'Escape': 1,
    'Initiator': 1,
    'Pusher': 2,
    'Support': 1
  },
  'Nature\'s Prophet': {
    'Carry': 1,
    'Complexity': 2,
    'Escape': 1,
    'Jungler': 3,
    'Nuker': 1,
    'Pusher': 3
  },
  'Necrophos': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 1,
    'Nuker': 2
  },
  'Night Stalker': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Nyx Assassin': {
    'Complexity': 2,
    'Disabler': 2,
    'Escape': 1,
    'Initiator': 2,
    'Nuker': 2
  },
  'Ogre Magi': {
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 1,
    'Initiator': 1,
    'Nuker': 2,
    'Support': 2
  },
  'Omniknight': {
    'Complexity': 1,
    'Durable': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Oracle': {
    'Complexity': 3,
    'Disabler': 2,
    'Escape': 1,
    'Nuker': 3,
    'Support': 3
  },
  'Outworld Devourer': {
    'Carry': 2,
    'Complexity': 2,
    'Disabler': 1,
    'Nuker': 2
  },
  'Phantom Assassin': {
    'Carry': 3,
    'Complexity': 1,
    'Escape': 1
  },
  'Phantom Lancer': {
    'Carry': 2,
    'Complexity': 2,
    'Escape': 2,
    'Nuker': 1,
    'Pusher': 1
  },
  'Phoenix': {
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 2,
    'Initiator': 2,
    'Nuker': 3,
    'Support': 1
  },
  'Puck': {
    'Complexity': 2,
    'Disabler': 3,
    'Escape': 3,
    'Initiator': 3,
    'Nuker': 2
  },
  'Pudge': {
    'Complexity': 2,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Pugna': {
    'Complexity': 2,
    'Nuker': 2,
    'Pusher': 2
  },
  'Queen of Pain': {
    'Carry': 1,
    'Complexity': 2,
    'Escape': 3,
    'Nuker': 3
  },
  'Razor': {
    'Carry': 2,
    'Complexity': 1,
    'Durable': 2,
    'Nuker': 1,
    'Pusher': 1
  },
  'Riki': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Escape': 2
  },
  'Rubick': {
    'Complexity': 3,
    'Disabler': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Sand King': {
    'Complexity': 2,
    'Disabler': 2,
    'Escape': 2,
    'Initiator': 3,
    'Jungler': 1,
    'Nuker': 2
  },
  'Shadow Demon': {
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 1,
    'Nuker': 1,
    'Support': 2
  },
  'Shadow Fiend': {
    'Carry': 2,
    'Complexity': 2,
    'Nuker': 3
  },
  'Shadow Shaman': {
    'Complexity': 1,
    'Disabler': 3,
    'Initiator': 1,
    'Nuker': 2,
    'Pusher': 3,
    'Support': 2
  },
  'Silencer': {
    'Carry': 1,
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 2,
    'Nuker': 1,
    'Support': 1
  },
  'Skywrath Mage': {
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 3,
    'Support': 2
  },
  'Slardar': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 2,
    'Escape': 1,
    'Initiator': 2
  },
  'Slark': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Escape': 3,
    'Nuker': 1
  },
  'Sniper': {
    'Carry': 3,
    'Complexity': 1,
    'Nuker': 1
  },
  'Spectre': {
    'Carry': 3,
    'Complexity': 2,
    'Durable': 1,
    'Escape': 1
  },
  'Spirit Breaker': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 2,
    'Escape': 1,
    'Initiator': 2
  },
  'Storm Spirit': {
    'Carry': 2,
    'Complexity': 3,
    'Disabler': 1,
    'Escape': 3,
    'Initiator': 1,
    'Nuker': 2
  },
  'Sven': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Techies': {
    'Complexity': 2,
    'Disabler': 1,
    'Nuker': 3
  },
  'Templar Assassin': {
    'Carry': 2,
    'Complexity': 2,
    'Escape': 1
  },
  'Terrorblade': {
    'Carry': 3,
    'Complexity': 2,
    'Nuker': 1,
    'Pusher': 2
  },
  'Tidehunter': {
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 3,
    'Initiator': 3,
    'Nuker': 1
  },
  'Timbersaw': {
    'Complexity': 2,
    'Durable': 2,
    'Escape': 2,
    'Nuker': 3
  },
  'Tinker': {
    'Carry': 1,
    'Complexity': 2,
    'Nuker': 3,
    'Pusher': 2
  },
  'Tiny': {
    'Carry': 3,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 2,
    'Initiator': 2,
    'Nuker': 2,
    'Pusher': 2
  },
  'Treant Protector': {
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Escape': 1,
    'Initiator': 2,
    'Support': 3
  },
  'Troll Warlord': {
    'Carry': 3,
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Pusher': 1
  },
  'Tusk': {
    'Complexity': 2,
    'Disabler': 2,
    'Initiator': 2,
    'Nuker': 1
  },
  'Underlord': {
    'Complexity': 2,
    'Disabler': 1,
    'Durable': 1,
    'Escape': 2,
    'Nuker': 1,
    'Support': 1
  },
  'Undying': {
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 2,
    'Nuker': 1,
    'Support': 1
  },
  'Ursa': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 1,
    'Jungler': 1
  },
  'Vengeful Spirit': {
    'Complexity': 1,
    'Disabler': 2,
    'Escape': 1,
    'Initiator': 2,
    'Nuker': 1,
    'Support': 3
  },
  'Venomancer': {
    'Complexity': 1,
    'Disabler': 1,
    'Initiator': 1,
    'Nuker': 1,
    'Pusher': 1,
    'Support': 2
  },
  'Viper': {
    'Carry': 1,
    'Complexity': 1,
    'Disabler': 1,
    'Durable': 2,
    'Initiator': 1
  },
  'Visage': {
    'Complexity': 3,
    'Disabler': 1,
    'Durable': 1,
    'Nuker': 2,
    'Pusher': 1,
    'Support': 1
  },
  'Warlock': {
    'Complexity': 1,
    'Disabler': 1,
    'Initiator': 2,
    'Support': 1
  },
  'Weaver': {
    'Carry': 2,
    'Complexity': 2,
    'Escape': 3
  },
  'Windranger': {
    'Carry': 1,
    'Complexity': 2,
    'Disabler': 1,
    'Escape': 1,
    'Nuker': 1,
    'Support': 1
  },
  'Winter Wyvern': {
    'Complexity': 2,
    'Disabler': 2,
    'Nuker': 1,
    'Support': 3
  },
  'Witch Doctor': {
    'Complexity': 1,
    'Disabler': 1,
    'Nuker': 2,
    'Support': 3
  },
  'Wraith King': {
    'Carry': 2,
    'Complexity': 1,
    'Disabler': 2,
    'Durable': 3,
    'Initiator': 1,
    'Support': 1
  },
  'Zeus': {
    'Complexity': 1,
    'Nuker': 3
  },
  'Pangolier': {
    'Carry': 2,
    'Nuker': 2,
    'Initiator': 2,
    'Disabler': 1,
    'Durable': 1,
    'Escape': 2,
    'Complexity': 2
  },
  'Dark Willow': {
    'Nuker': 2,
    'Disabler': 1,
    'Escape': 2,
    'Support': 2,
    'Complexity': 2
  }
};
