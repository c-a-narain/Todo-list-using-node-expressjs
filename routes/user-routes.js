const user_router = require("express").Router();
const {loginValidator,registerValidator} = require("../middleware/validator");
const {signup,login} = require("../controller/user-controller")

user_router.post("/signup",registerValidator,signup);
user_router.get("/login",loginValidator,login);


module.exports = user_router;