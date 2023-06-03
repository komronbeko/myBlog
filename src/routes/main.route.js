const {Router} = require("express");
const post_controller = require("../controllers/main_controllers/post.controller");
const {get_controller, get_specific_controllers} = require("../controllers/main_controllers/get.controller");
const put_controller = require("../controllers/main_controllers/put.controller");
const delete_controller = require("../controllers/main_controllers/delete.controller");
const isAuth = require("../middlewares/is-auth");

const router = Router();

router.get("/posts", isAuth, get_controller);
router.get("/post/:id", isAuth, get_specific_controllers);
router.post("/post", isAuth, post_controller);
router.put("/post/:id", isAuth, put_controller);
router.delete("/post/:id", isAuth, delete_controller);


module.exports = router;