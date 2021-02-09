const { User } = require("../models/user");

let auth = (req, res, next) => {
  // return res.status(200).json({
  //   isAuth: false,
  //   error: true,
  // });
  let token = req.cookies.w_auth;

  User.findByToken(token, (err, user) => {
    // if (err) throw err;
    if (!user || err) {
      return res.status(200).json({
        isAuth: false,
        error: true,
      });
    }
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
