const User = require('./user')
const DailyProgress = require('./dailyprogress')
const Subscription = require('./subscription')
const Response = require('./owl')
const Level = require('./level')
const Unlock = require('./unlock')
const Boombox = require('./boombox')

// const {default: user} = require('../../../client/store/user')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
User.hasMany(DailyProgress)
DailyProgress.belongsTo(User)

User.hasMany(Subscription)
Subscription.belongsTo(User)

//To add 'like' feature later, Unlock model
//has to have PK, so it's not made as through table btw User and Level.
User.hasMany(Unlock)
Unlock.belongsTo(User)

Level.hasMany(Unlock)
Unlock.belongsTo(Level)

User.hasOne(Boombox)
Boombox.belongsTo(User)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  DailyProgress,
  Subscription,
  Response,
  Level,
  Unlock,
  Boombox
}
