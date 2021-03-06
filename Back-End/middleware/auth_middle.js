/* eslint-disable camelcase */
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  const { token } = req.cookies;
  console.log("token", token);
  if (!token) {
    console.log("no token")
    return res.status(401).json({ success: false, message: "Unauthorized !" });
  }
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  if (!user) {
    console.log("no user")
    return res.status(401).json({ success: false, message: "Unauthorized !" });
  }
  req.current_user_id = user.id;
  next();
};

module.exports = {
  isAuth,
};
