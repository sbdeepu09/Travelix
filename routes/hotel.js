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

router.get('/profile/:id',(req,res)=>{
    hotelHelpers.getProfile(req.params.id).then((hotel)=>{
        console.log(hotel);
        res.render('hotel/profile',{hotel})
    })
    
})



module.exports = router;