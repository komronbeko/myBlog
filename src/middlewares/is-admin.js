const jwt = require("../utils/jwt");
const Io = require("../utils/Io");
const Users = new Io("database/users.json");

const isAdmin = async(req, res, next) => {
  try {
    const {token} = req.cookies;
    const users = await Users.read();

    const verifyToken = jwt.verify(token);

    const user_id = verifyToken.payload;

    const findAdmin =  users.find(el=> el.id === user_id && el.role === "admin");

    if(!findAdmin){
      return res.status(403).json({message: "you are not admin"})
    }

    next();

  } catch (error) {
    res.status(403).json({message: error.message})
  }
};

module.exports = isAdmin;
