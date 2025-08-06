const {Schema} = require('mongoose');
const FundsSchema=new Schema({
    available: Number,
    used: Number,
    payin: Number,
    openingBalance: Number,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

module.exports={FundsSchema};