const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  courses: {
    type: [Number],
    default: []
  },
  ratings: {
    type: Map,
    of: Number,
    default: {}
  }
});

// Create User model
const User = mongoose.model('User', userSchema);

module.exports = User;
