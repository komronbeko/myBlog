const {Router} = require("express");
const isAdmin = require("../middlewares/is-admin");
const { adminController } = require("../controllers/admin_controller/admin.controller");

const router = Router();

router.put("/admin/post/:id", isAdmin, adminController);

module.exports = router