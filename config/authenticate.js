require('dotenv').config()
const passport = require('passport')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
   // User.findOrCreate({ googleId: profile.id }, function (err, user) {
     // return cb(err, user);
   // });
    console.log(profile);
   cb(null,profile)
  }
));