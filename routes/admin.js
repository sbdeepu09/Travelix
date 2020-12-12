require('dotenv').config();
const { response } = require('express');
var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
var router = express.Router();


/* GET users listing. */
router.get('/',(req, res)=> {
  if(req.session.admin){
    admin=req.session.admin
    res.render('admin/home',{admin})
  }else{
    res.render('admin/login',{loginErr:req.session.adminLoginErr})
    req.session.adminLoginErr=false
  }
});

router.post('/',(req,res)=>{
  adminHelpers.adminLogin(req.body).then((response)=>{
    if(response.status){
      req.session.admin = response.admin
      req.session.adminLoggedIn=true
      admin=req.session.admin
      res.render('admin/home',{admin})
    }else{
      req.session.adminLoginErr = "Invalid username or password"
      res.redirect('/admin')
    }
    
  })
    
})

router.get('/hotels',(req,res)=>{
  adminHelpers.getAllHotels().then((hotels)=>{
    console.log(hotels);
    res.render('admin/hotels',{admin:true,hotels})
  })
})

router.post('/add-hotel',(req,res)=>{
  adminHelpers.createHotelLogin(req.body).then((response)=>{
    res.redirect('/admin/hotels')
    
  })
})

router.get('/logout',(req,res)=>{
  req.session.admin= null
  res.redirect('/admin')
})
module.exports = router;
