const dotenv = require("dotenv");
dotenv.config();
require("./http/server").listen();
require("./core/mongodb/mongodb").connect();
