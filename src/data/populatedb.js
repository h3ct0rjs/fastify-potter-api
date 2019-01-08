const mongoose = require('mongoose')
const Char = require('../models/Char')
const async = require('async')

const fs = require('fs')

const fileData = fs.readFileSync('./characters.csv','utf8').split('\n')


//hfjimenez@utp.edu.co

const dbconnect = async() => {
    try {
        const client = await mongoose.connect("mongodb://localhost:27017/fastify_potter_api",{ useNewUrlParser: true })
        console.log('Mongodb is connected')
    } catch (error) {
        console.log('Check your mongodb connection, maybe is your service down?')
        console.log(error)
    }
}
dbconnect()

const characters_total = []
function characterCreate(name, bio, cb){
    const char = new Char({
        name:name,
        bio:bio
    })
    char.save(function (err) {
        if(err){
            console.log(`[-] Error saving character: ${char.name}`)
            console.log(err)
            cb(null,char)
        }
        console.log('New Character Stored in Database:' + char)
        characters_total.push(char)
    })
}

function populateCharacters(cb){
    async.parallel([
        function(callback){
            for(let i = 0;i<fileData.length;i++){
                console.log('------')
                let tmp = fileData[i].split(',')
                let name = tmp[0]
                let bio = tmp[1]
                console.log(tmp,name,bio);
                characterCreate(name,bio,callback)
            }
        }
    ])
}
async.series([
    populateCharacters
],
    function(err, results){
        if(err){
            console.log('Final Error' + err)
        }
        else{
            console.log('Characters done')
        }
        mongoose.connection.close()
        process.exit(1)
    }
)
