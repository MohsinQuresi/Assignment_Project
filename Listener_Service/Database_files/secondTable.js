const mongoose = require('mongoose');

const secondTableSchema = new mongoose.Schema({
    id: String,
    user: String,
    class: String,
    age: Number,
    email: String,
    inserted_at: { type: Date, default: Date.now },
    modified_at: Date,
  });

  module.exports = mongoose.model('SecondTable', secondTableSchema);