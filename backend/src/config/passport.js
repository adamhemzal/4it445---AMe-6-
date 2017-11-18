const JsonStrategy = require('passport-json').Strategy;
const adminUsername = process.env.ROOT_ADMIN_USERNAME || '';
const adminPassword = process.env.ROOT_ADMIN_PASSWORD || '';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  passport.use(new JsonStrategy({passReqToCallback: true},
    function(req, username, password, done) {
      bcrypt.hash(password, saltRounds).then(function(hash) {
        console.log(hash);
      });
      // Admin login
      if (username == adminUsername) {
        bcrypt.compare(password, adminPassword)
        .then(function(res) {
          if (res) {
            return done(null, {username: "admin", password: adminPassword}, "Login successful");
          }
          return done(null, false, { message: "Incorrect credentials" });
        })
      } else {
        // Vyber usera z DB podle jmena
        // Porovnani hesel
        // Nyni se vzdy vraci chyba
        return done(null, false, { message: "Incorrect credentials" });
      }
    }
  ));
};
