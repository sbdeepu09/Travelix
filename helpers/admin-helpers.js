const db = require('../config/connection')
const collection = require('../config/collection')
const generator = require('generate-password')

module.exports = {
    adminLogin:(loginData)=>{
        return new Promise(async (resolve,reject)=>{
            loginStatus=false
            let response = {}
            let admin =await db.get().collection(collection.ADMIN_COLLECTION).findOne({username:loginData.email})
            if(admin){               
                    if(admin.password==loginData.pass){
                        //console.log('login success');
                        response.admin=admin
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
    createHotelLogin:(hotelData)=>{
        return new Promise((resolve,reject)=>{
            let hotelObject=hotelData
            hotelObject.password=generator.generate({length:10,numbers:true})
            hotelObject.location=""
            hotelObject.starRating=""
            hotelObject.contactInfo=""
            hotelObject.rooms=""

            db.get().collection(collection.HOTEL_COLLECTION).insertOne(hotelObject).then((data)=>{
                resolve(data.ops[0]._id);
            })


        })
    },
    getAllHotels:()=>{
        return new Promise(async (resolve,reject)=>{
            let Hotels = await db.get().collection(collection.HOTEL_COLLECTION).find().toArray()
            resolve(Hotels)
        })
    }
}