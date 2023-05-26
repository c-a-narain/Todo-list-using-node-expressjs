const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const {queryExecuter} = require("./utils/connectionFile")
const userRoutes = require("./routes/user-routes")
const userRoutes = require("./routes/todo-routes")
const Joi = require("joi");
const jwt = require('jsonwebtoken');
const controllerRouter = require("./routes/todo-routes");
dotenv.config();
app.use(express.json())


app.use("/",userRoutes);
app.use("/",controllerRouter);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
