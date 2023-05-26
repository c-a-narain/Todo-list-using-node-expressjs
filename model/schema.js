const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json())

const registerSchema = Joi.object({
    ID: Joi.number().required(),
    EMAIL: Joi.string().email().lowercase().required(),
    USERNAME: Joi.string().min(4).required(),
    PASSWORD: Joi.string().min(4).required(),
    PHONE : Joi.string().min(10).max(15).required()
  });

const loginSchema = Joi.object({
    EMAIL: Joi.string().email().lowercase().required(),
    USERNAME: Joi.string().min(4).required(),
    PASSWORD: Joi.string().min(4).required(),
})

module.exports = {registerSchema,loginSchema};