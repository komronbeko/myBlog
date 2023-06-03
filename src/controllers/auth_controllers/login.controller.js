const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const { sign } = require("../../utils/jwt");

const Io = require("../../utils/Io");
const Users = new Io("database/users.json");


const login_controller = async (req, res) => {
  try {
    const { username, password} = req.body;

    const usersData = await Users.read();

    const findUser = usersData.find((el) => el.username === username);

    if (!findUser) {
      return res.status(403).json({ message: "User not found" });
    }

    const comparePass = await bcrypt.compare(password, findUser.password);

    if (!comparePass) {
      return res.status(403).json({ message: "User not found" });
    }

    const token = sign(findUser.id);

    res.cookie("token", token);

    res.status(200).json({ message: "Logged in successfully 😊 👌", token });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = login_controller;
