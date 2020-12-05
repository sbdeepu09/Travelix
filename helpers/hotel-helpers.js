const db = require('../config/connection')
const collection = require('../config/collection')
const { ObjectId } = require('mongodb')

module.exports = {
    doLogin:(loginData)=>{
        return new Promise(async (resolve,reject)=>{
            loginStatus=false
            let response = {}
            let hotel =await db.get().collection(collection.HOTEL_COLLECTION).findOne({username:loginData.email})
            if(hotel){               
                    if(hotel.password==loginData.pass){
                        //console.log('login success');
                        response.hotel=hotel
                        response.status=true
                        resolve(response)
                    }
                    else{
                        //console.log('Login failed');
                        resolve({status:false})
                    }
                
            }else{
                //console.log('Login Failed');
                resolve({status:false})
            }

        })
    },
    getProfile:(hotelId)=>{
        return new Promise(async (resolve,reject)=>{
            let hotel = await db.get().collection(collection.HOTEL_COLLECTION).findOne({_id:ObjectId(hotelId)})
            resolve(hotel)
        })
    }

}