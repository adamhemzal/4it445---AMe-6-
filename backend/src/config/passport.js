const LocalStrategy = require('passport-local').Strategy;
const adminUsername = process.env.ROOT_ADMIN_USERNAME || '';
const adminPassword = process.env.ROOT_ADMIN_PASSWORD || '';

module.exports = (passport) => {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    done(null, id);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      console.log(username);
      console.log(adminUsername);
      console.log(password);
      console.log(adminPassword);
      if (username === adminUsername && password === adminPassword) {
        return done(null, {username: "foo", password: "bar"});
      } else {
        return done(null, false, { message: "Incorrect credentials" });
      }
    }
  ));
};
