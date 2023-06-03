const {Router} = require("express");
const login_controller = require("../controllers/auth_controllers/login.controller");
const register_controller = require("../controllers/auth_controllers/register.controller");

const router = Router();

router.post("/auth/login", login_controller)
router.post("/auth/register", register_controller);

module.exports = router;