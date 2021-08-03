const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: {type: String, required: true},
    imageUrl: {type: String, required: true},
    bio: {type: String, required: true},
    interests: {type: Array, required: true},
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    }, {
    timestamps: true,
});

module.exports = mongoose.model('Profile', profileSchema);