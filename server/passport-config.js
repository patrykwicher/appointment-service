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

    
        // if(await bcrypt.compare(user.password, password)) {
        //    return done(null, false, { message: '' });
        // }

        // console.log(user);
        // return done(null, user);
    });
})); 

passport.serializeUser((user, done) => {
    // const userId = user._id.toString();
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Client.findById(id, (err, user) => {
        done(err, user);
    });
});

module.exports = passport;