const jwt = require("../utils/jwt");

const isAuth = (req, res, next) => {
  try {
    const {token} = req.cookies;

    if(!token){
        return res.status(403).json({message: "Invalid token"})
    }  

    const verifyToken = jwt.verify(token);

    req.verifyUser = verifyToken.payload;

    next();

  } catch (error) {
    res.status(403).json({message: "Invalid token"})
  }
};

module.exports = isAuth;
