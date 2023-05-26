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
const { responsefunc, responseDisplay } = require("../helpers/response");
const {errorHandler} = require("../helpers/errorHandler");

const addTask = async (req, res) => {
  const { TASK } = req.body;

  try {
    const values = [[TASK]];

    const token = await req.headers.authorization.split(" ")[1];
    var decode = await check(token);
    const UID = await queryRunner(
      "SELECT ID FROM USER WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    if (decode) {
      const sqlst = "INSERT INTO TODO (TASK,USID) VALUES (?)";
      values[0].push(UID[0].ID);

      await queryExecuter(sqlst, values);

      await responseDisplay(201, true, "Task Created", req.body, res);
      console.log({
        success: true,
      });
    } else {
      console.log("Error");
    }
    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
}; //Addtask

const updateTask = async (req, res) => {
  const { ID } = req.body;

  try {
    const values = [[ID]];

    const token = await req.headers.authorization.split(" ")[1];
    var decode = await check(token);
    const UID = await queryRunner(
      "SELECT ID FROM USER WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    if (decode) {
      const sqlst = "UPDATE TODO SET COMPLETED = 1 WHERE ID = (?) ";

      await queryExecuter(sqlst, values);

      console.log({
        success: true,
      });

      await responseDisplay(201, true, "Updated Successfull", req.body, res);
    } else {
      console.log("Error");
    }
    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

const deleteTask = async (req, res) => {
  const { ID } = req.body;

  try {
    const values = [[ID]];

    const token = await req.headers.authorization.split(" ")[1];
    var decode = await check(token);
    const UID = await queryRunner(
      "SELECT ID FROM USER WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    if (decode) {
      const sqlst = "DELETE FROM TODO WHERE ID = (?)";

      // await queryRunner(sqlst);
      await queryExecuter(sqlst, values);

      console.log({
        success: true,
      });

      await responsefunc(201, true, "Deleted Successfully", res);
    } else {
      console.log("Error");
    }
    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

const readTask = async (req, res) => {
  // const {ID} = req.body;

  try {
    // const values = [[ID]];

    const token = await req.headers.authorization.split(" ")[1];
    var decode = await check(token);
    const UID = await queryRunner(
      "SELECT ID FROM USER WHERE EMAIL = '" + decode.EMAIL + "';"
    );

    console.log(UID[0].ID);
    if (decode) {
      const sqlst = "SELECT * FROM TODO WHERE USID = '" + UID[0].ID + "' ";

      const readAll = await queryRunner(sqlst);

      console.log({
        success: true,
      });

      await responseDisplay(201, true, "Updated Successfull", req.body, res);
    } else {
      console.log("Error");
    }

    return;
  } catch (err) {
    new errorHandler(401, false, err.message, {}, res);
  }
};

module.exports = { addTask, updateTask, deleteTask, readTask };
