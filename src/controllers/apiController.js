const boom = require('boom')
const os = require('os')

// Get all characters in the database
exports.getInfo = async (req, reply) => {
    try {
      const info = await os.cpus()
      console.log(info)
      return info
    } catch (err) {
      throw boom.boomify(err)
    }
  }
  