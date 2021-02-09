const { User } = require("./../models/user");

let auth = (req, res, next) => {
  // let token = req.cookies.w_auth;
  // console.log("🚀 ~ file: auth.js ~ line 5 ~ auth ~ token", token);
  let token = "123";

  User.findByToken(token, (err, user) => {
    if (err) {
      console.log("🚀 ~ file: auth.js ~ line 9 ~ User.findByToken ~ err", err);
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    // if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
