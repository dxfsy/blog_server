const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

const redisClient = redis.createClient(REDIS_CONF.port,REDIS_CONF.host)
redisClient.on('error',(err)=> {
    console.error(err);
})

const set = (key,val)=> {
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key,val,redis.print)
}
const get = (key,val)=> {
    return new Promise((resolve,reject)=> {
        redisClient.get(key,(err,val)=> {
            console.log('redis get ',val);
            if(err) {
                reject(err)
                return 
            }
            if(val === void 0){
                resolve(null)
                return
            }

            try {
                resolve(JSON.parse(val))
            } catch(ex) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    get,
    set
}