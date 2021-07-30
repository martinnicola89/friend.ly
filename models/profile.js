const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {type: String, required: true},
    bio: {type: String, required: true},
    interests: {type: String, required: true},
    friends: {type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    }, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);