const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: String,
  interests: [String],       // ["ai", "politics"]
  languages: [String],       // ["en", "hi"]
  createdAt: { type: Date, default: Date.now },
  lastActiveAt: Date,
  settings: {
    weeklyDigest: { type: Boolean, default: true }
  }
});

module.exports = mongoose.model('User', UserSchema);
