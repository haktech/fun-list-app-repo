const Router = require("koa-router");
const moviesController = require("./controllers/moviesController");
const actorsController = require("./controllers/actorsController");

const router = new Router();

router.use(moviesController.routes(), moviesController.allowedMethods());
router.use(actorsController.routes(), actorsController.allowedMethods());

module.exports = router.routes();
