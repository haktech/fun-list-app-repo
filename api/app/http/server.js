const Koa = require("koa");
const swagger = require("swagger2");
const { ui } = require("swagger2-koa");
const bodyParser = require("koa-bodyparser");
const router = require("./router");

function listen() {
  const koaApp = new Koa();
  koaApp.use(bodyParser()).use(router);
  if (process.env.NODE_ENV == "local") {
    const swaggerDocument = swagger.loadDocumentSync("api.yaml");
    koaApp.use(ui(swaggerDocument, "/swagger"));
  }
  return koaApp.listen(3002, () => {
    console.log("Backend server started!");
  });
}

module.exports = { listen };
