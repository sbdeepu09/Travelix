const db = require('../config/connection')
const collection = require('../config/collection')

module.exports = {
    adminLogin:(loginData)=>{
        return new Promise(async (resolve,reject)=>{
            loginStatus=false
            let response = {}
            let admin =await db.get().collection(collection.ADMIN_COLLECTION).findOne({username:loginData.email})
            if(admin){               
                    if(admin.password==loginData.pass){
                        console.log('login success');
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }
                    else{
                        console.log('Login failed');
                        resolve({status:false})
                    }
                
            }else{
                console.log('Login Failed');
                resolve({status:false})
            }
        })
    }
}