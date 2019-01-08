const mongoose = require('mongoose')
const fastify = require('fastify')({
    logger: true
  })

const dbconnect = async() => {
    try {
        const client = await mongoose.connect("mongodb://localhost:27017/fastify_potter_api",{ useNewUrlParser: true })
        fastify.trace('Mongodb is connected')
    } catch (error) {
        fastify.error('Check your mongodb connection, maybe is your service down?')
        fastify.error(error)
    }
}
dbconnect()

// Fastify third party
fastify.register(require('fastify-chalk'))

// require routes 
const routes = require('./routes/routes')
routes.forEach((route, index) =>{
  fastify.route(route);
  console.log(index, route)
})
console.log('-');
fastify.get('/', async (req,reply) => {
    fastify.debug(`a request is received: \n${req.body}`)
    return { status : 'ok'} 
})

const start = async ()=> {
    try {
        await fastify.listen(9000)
        fastify.info(`server listening on ${fastify.server.address().port}`)
        //fastify.info('This is an info line');
    } catch (error) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()