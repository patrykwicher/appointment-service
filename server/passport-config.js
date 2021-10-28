const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Client = require('./models/clientSchema.js');

passport.use(new LocalStrategy((username, password, done) => {
    Client.findOne({ email: username }, async (err, user) => {
        if(err) { 
            return done(err);
        };

        if(!user) {
            return done(null, false, { message: 'Incorrect email' });
        }
        
        try {
            const result = await bcrypt.compare(password, user.password);

            if(!result) {
                return done(null, false, { message: 'Incorrect password' });
             } else {
                return done(null, user);
             }
        } catch(e) {
            return done(e);
        }
    });
})); 

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserial')

    Client.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;