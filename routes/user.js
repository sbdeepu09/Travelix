var express = require('express');
var router = express.Router();
const passport = require('passport')
require('../config/authenticate')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/google', passport.authenticate('google',{ scope: ['profile', 'email']}),(req,res)=>{
 
});
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/login'}),(req,res)=>{
  res.end("Logged In")
  
})
module.exports = router;
