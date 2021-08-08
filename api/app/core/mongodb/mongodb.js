const mongoose = require("mongoose");

function connect() {
  mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log("DB is up!");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = { connect };
