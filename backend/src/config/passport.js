const JsonStrategy = require('passport-json').Strategy;
const adminUsername = process.env.ROOT_ADMIN_USERNAME || '';
const adminPassword = process.env.ROOT_ADMIN_PASSWORD || '';
const bcrypt = require('bcrypt');
const saltRounds = 10;
import db from '../models/';

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new JsonStrategy({passReqToCallback: true},
    function(req, username, password, done) {
      bcrypt.hash(password, saltRounds).then(function(hash) {
      });
      // Admin login
      if (username == adminUsername) {
        bcrypt.compare(password, adminPassword)
        .then(function(res) {
          if (res) {
            return done(null, {username: "admin", password: adminPassword}, "Login successful");
          }
          return done(null, false, { message: "Invalid username or password" });
        })
        // User login
      } else {
        db.user.findOne({where: {username: username}}).then(user => {
          if (!user) {
            return done(null, false, { message: 'Invalid username or password' });
          }
          bcrypt.compare(password, user.password)
          .then(function(res) {
            if (res) {
              return done(null, user, "Login successful");
            }
            return done(null, false, { message: "Incorrect credentials" });
          })
        })


        // const user = db.User.findOne({where: {username: username}});
        // if (!user) {
        //   return done(null, false, { message: 'Incorrect username.' });
        // }
        // bcrypt.compare(password, user.password)
        // .then(function(res) {
        //   if (res) {
        //     return done(null, user, "Login successful");
        //   }
        //   return done(null, false, { message: "Incorrect credentials" });
        // })
        // Vyber usera z DB podle jmena
        // Porovnani hesel
        // Nyni se vzdy vraci chyba
        // return done(null, false, { message: "Incorrect credentials" });
      }
    }
  ));
};
