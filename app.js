var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");

const _port = process.env.PORT || 3000;
const cors = require("cors");
const autoIncrement = require("mongoose-auto-increment");
const { createConnection } = require("mongoose");
const connection_URI =
  "mongodb+srv://dustinamoda18_db_user:yXDHaYj70fS5SZbu@cluster0.yht0hqq.mongodb.net/IMS?retryWrites=true&w=majority";
require("./Configuration/config");
require("./Database/mongoose");

//import
var authenticate = require("./Middlewares/authenticate");

app.use(morgan("dev"));

//body-parsar
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// database URI connection required by autoIncrement
const connection = createConnection(connection_URI);

//initialize mongoose-auto-increment
autoIncrement.initialize(connection);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//handle validation errors within the application
app.use((err, req, res, next) => {
  if (err.name == "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message),
    );
    res.status(422).send(valErrors);
  }
});

app.listen(_port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server started at port: ${_port}`);
});

// Express Routing Table
// http://localhost:3000/products/ -- products CRUD
app.use("/products", require("./Routes/product"));

// http://localhost:3000/suppliers/ -- supplier CRUD
app.use("/api/suppliers", require("./Routes/supplier"));

// http://localhost:3000/auth/ -- user registration
app.use("/auth", require("./Controller/auth"));

// http://localhost:3000/user/ -- for profile
app.use("/user", authenticate, require("./Controller/user"));

// http://localhost:3000/employees -- supplier CRUD
app.use("/employees", require("./Routes/employee"));
