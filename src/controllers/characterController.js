const boom = require('boom')
const Char = require('../models/Char')

// Get all characters in the database
exports.getCharacters = async (req, reply) => {
    try {
      const chars = await Char.find()
      return chars
    } catch (err) {
      throw boom.boomify(err)
    }
}

// Get one character in the database
exports.getSingleCharacter = async (req, reply) => {
    try {
        const id = req.params.id
        const char = await Char.findById(id)
        return char
    } catch (err) {
      throw boom.boomify(err)
    }
}

// Add a new character
exports.addCharacter = async (req, reply) => {
    try {
      const char = new Char(req.body)
      return char.save()
    } catch (err) {
      throw boom.boomify(err)
    }
}

// Update an existing character
exports.updateCharacter = async (req, reply) => {
    try {
      const id = req.params.id
      const char = req.body
      //spread :) 
      const { ...updateData } = char
      const update = await Char.findByIdAndUpdate(id, updateData, { new: true })
      return update
    } catch (err) {
      throw boom.boomify(err)
    }
  }

  // Update an existing character
exports.deleteCharacter = async (req, reply) => {
    try {
      const id = req.params.id
      const char = await Char.findByIdAndRemove(id )
      return char
    } catch (err) {
      throw boom.boomify(err)
    }
  }
