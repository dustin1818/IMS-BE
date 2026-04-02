const mongoose = require("mongoose");
require("dotenv/config");

const connection_URI =
  "mongodb+srv://dustinamoda18_db_user:yXDHaYj70fS5SZbu@cluster0.yht0hqq.mongodb.net/IMS?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  autoIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connection_URI, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

module.exports = mongoose;
