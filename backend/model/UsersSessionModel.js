const {model}= require('mongoose');
const {UserSessionSchema} = require('../schemas/UserSessionSchema');
const UserSessionModel = model('UserSession', UserSessionSchema);
module.exports = { UserSessionModel };