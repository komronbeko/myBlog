const { v4: uuid } = require("uuid");
const bcrypt = require("bcrypt");

const { sign } = require("../../utils/jwt");

const Io = require("../../utils/Io");
const Users = new Io("database/users.json");

const User = require("../../models/User");

const register_controller = async (req, res) => {
  try {
    const { username, password} = req.body;

    const usersData = await Users.read();

    const findUser = usersData.find((el) => el.username === username);

    if (findUser) {
      return res.status(403).json({ message: "User alreday exists" });
    }

    const id = uuid();
    const hashPass = await bcrypt.hash(password, 12);

    const newUser = new User(id, username, hashPass, "user");

    const newUsersData = [...usersData, newUser];

    const token = sign(id);

    res.cookie("token", token);

    Users.write(newUsersData);

    res.status(201).json({ message: "Successfully registered 😊 👌", token });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = register_controller;
