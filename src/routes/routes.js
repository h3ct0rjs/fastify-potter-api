const charController = require('../controllers/characterController')
const apiInformation = require('../controllers/apiController')

const routes = [
    {
        method : 'GET', 
        url    : '/api/characters', 
        handler: charController.getCharacters
    }, 
    {
        method : 'GET', 
        url    : '/api/character', 
        handler: charController.getSingleCharacter
    }, 
    {
        method : 'POST', 
        url    : '/api/character', 
        handler: charController.addCharacter
    }, 
    {
        method : 'PUT', 
        url    : '/api/character/:id', 
        handler: charController.updateCharacter
    }, 
    {
        method : 'DELETE', 
        url    : '/api/character/:id', 
        handler: charController.deleteCharacter
    }, 
    {
        method : 'GET', 
        url    : '/api/info', 
        handler : apiInformation.getInfo
    }, 
]

module.exports = routes