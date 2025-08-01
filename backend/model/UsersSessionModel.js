const {model}= require('mongoose');
const {UserSessionSchema} = require('../schemas/UsersSessionSchema');
const UserSessionModel = model('UserSession', UserSessionSchema);
module.exports = { UserSessionModel };