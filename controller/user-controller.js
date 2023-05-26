const express = require("express");
const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
app.use(express.json());

const { queryExecuter, queryRunner } = require("../utils/connectionFile");
const { tokenGenerator, check } = require("../middleware/jwtValidation");
const { responsefunc } = require("../helpers/response");
const {errorHandler} = require("../helpers/errorHandler");

const signup = async (req, res) => {
  const { ID, EMAIL, USERNAME, PASSWORD, PHONE } = req.body;

  try {
    const values = [
      [ID, EMAIL, USERNAME, await bcrypt.hash(PASSWORD, 10), PHONE],
    ];
    const sqlst = "INSERT INTO USER VALUES (?);";

    await queryExecuter(sqlst, values);

    // const tk = await tokenGenerator(req.body);
    // console.log(tk);

    console.log({
      success: true,
    });

    await responsefunc(201, true, "Signup Successfull", res);

    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
}; //insert

const login = async (req, res) => {
  const { EMAIL, USERNAME, PASSWORD } = req.body;

  try {
    const values = [[EMAIL, USERNAME, PASSWORD]];

    const email = await queryRunner(
      "SELECT EMAIL FROM USER WHERE EMAIL = `EMAIL`;"
    );

    if (email == undefined) {
      return console.error();
    } else {
      const pswd = await queryRunner(
        "SELECT PASSWD FROM USER WHERE EMAIL = '" + EMAIL + "';"
      );

      let result = await bcrypt.compare(PASSWORD, pswd[0].PASSWD);
      if (result == true) {
        const tk = await tokenGenerator(req.body);
        console.log(tk);

        await responsefunc(201, true, "Login Successfull", res);
      }
    }
    console.log({
      success: true,
    });
    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

module.exports = { signup, login };
