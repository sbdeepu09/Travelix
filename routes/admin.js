var express = require('express');
const userHelpers = require('../helpers/user-helpers');
const { route } = require('./user');
var router = express.Router();

/* GET users listing. */
router.get('/',(req, res)=> {
  res.render('admin/signup')
});

router.post('/',(req,res)=>{
  userHelpers.adminsignup(req.body).then((data)=>{
    
  })
})

module.exports = router;
