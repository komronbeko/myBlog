const {Router} = require("express");
const likes_get_controller = require("../controllers/likes_controllers/get.controller");
const likes_put_controller = require("../controllers/likes_controllers/put.controller");
const isAuth = require("../middlewares/is-auth");

const router = Router();

router.get("/like/:id", isAuth, likes_get_controller);
router.put("/like/:id", isAuth, likes_put_controller);

module.exports = router;