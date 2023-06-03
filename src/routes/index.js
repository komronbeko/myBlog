const authRoutes = require("./auth.route");
const mainRoutes = require("./main.route");
const likesRoutes = require("./likes.route");
const adminRoute = require("./admin.route");

module.exports = [authRoutes, mainRoutes, likesRoutes, adminRoute];