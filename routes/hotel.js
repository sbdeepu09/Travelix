const { response } = require('express');
var express = require('express');
var router = express.Router();
const hotelHelpers = require('../helpers/hotel-helpers')

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.hotel)
  {
      hotel=req.session.hotel
      res.render('hotel/home',{hotel})
  }else{
    res.render('hotel/login',{loginErr:req.session.hotelLoginErr});
    req.session.hotelLoginErr=false
  }
});

router.post('/',(req,res)=>{
    hotelHelpers.doLogin(req.body).then((response)=>{
        if(response.status){
            req.session.hotel = response.hotel
            req.session.hotelLoggedIn=true
            hotel=req.session.hotel
            res.render('hotel/home',{hotel})
          }else{
            req.session.hotelLoginErr = "Invalid username or password"
            res.redirect('/hotel')
          }
              
    })
})

router.get('/logout',(req,res)=>{
    req.session.hotel=null
    res.redirect('/hotel')
})

router.get('/profile',(req,res)=>{
  let hotelId=req.session.hotel._id
    hotelHelpers.getProfile(hotelId).then((hotel)=>{
        res.render('hotel/profile',{hotel})
    })
    
})

router.get('/edit-profile',(req,res)=>{
  let hotelId=req.session.hotel._id
  hotelHelpers.getProfile(hotelId).then((hotel)=>{
    res.render('hotel/edit-profile',{hotel})
  })
})

router.post('/edit-profile/:id',(req,res)=>{
  hotelHelpers.editProfile(req.params.id,req.body).then((id)=>{
    let image = req.files.image
    image.mv('./public/images/hotel-images/'+id+'.jpg',(err,done) => {
      if(!err)
        res.redirect('/hotel/profile')
      else
        console.log(err)
    })
  })
})


module.exports = router;