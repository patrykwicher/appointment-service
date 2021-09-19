const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Client = require('./models/clientSchema.js');

passport.use(new LocalStrategy(( username, password, done) => {
    Client.findOne({ email: username }, (err, user) => {
        if(err) { 
            return done(err);
        };

        if(!user) {
            return done(null, false, { message: 'Incorrect email'});
        }
        
        if(!bcrypt.compare(password, user.password)) {
           return done(null, false, { message: 'Incorrect password'});
        }

        return done(null, user);
    });
}));


passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Client.findById(id, (err, done) => {
        done(err, user);
    })
})

module.exports = passport;