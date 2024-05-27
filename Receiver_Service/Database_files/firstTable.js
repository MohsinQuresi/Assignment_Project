const mongoose = require('mongoose');


const firstTableSchema = new mongoose.Schema({

  id: String,
  user: String,
  class: String,
  age: Number,
  email: String,
  inserted_at: { type: Date, default: Date.now },
  processed: { type: Boolean, default: false } 

});

module.exports = mongoose.model("firstTable", firstTableSchema);