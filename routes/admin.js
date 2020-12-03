var express = require('express');
const adminHelpers = require('../helpers/admin-helpers');
const { route } = require('./user');
var router = express.Router();

/* GET users listing. */
router.get('/',(req, res)=> {
  res.render('admin/login')
});

router.post('/',(req,res)=>{
  adminHelpers.adminLogin(req.body).then((response)=>{
    if(response.status){
      //req.session.admin=response.admin
      //req.session.admin.loggedIn=true
      res.render('admin/home')
    }else{
      //req.session.adminLoginErr = "Invalid username or password"
      res.redirect('/admin')
    }
    
  })
    
})

module.exports = router;
