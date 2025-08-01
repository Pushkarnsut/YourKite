const {Schema} = require('mongoose');

const UserSessionSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        required: true, 
        unique: true,
        ref: 'User'
    },
    sessionId: { 
        type: String, 
        required: true 
    },
    lastActive: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = { UserSessionSchema };