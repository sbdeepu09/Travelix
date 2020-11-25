const db = require('../config/connection')
const collection = require('../config/collection')

module.exports = {
    adminsignup:(details) =>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.ADMIN_COLLECTION).insertOne(details).then((data)=>{
                console.log(data.ops[0]);
            })
        })
    }
}