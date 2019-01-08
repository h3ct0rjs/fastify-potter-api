const mongoose = require('mongoose')
//Data is imported from  potterverse repo
const charSchema = new mongoose.Schema({
    name: String,
    bio: String,
  });
  
module.exports = mongoose.model('Char', charSchema);