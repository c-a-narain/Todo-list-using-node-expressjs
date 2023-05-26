const controllerRouter = require("express").Router();
const {loginValidator,registerValidator} = require("../middleware/validator");
const {signup,login} = require("../controller/todo-controller")

controllerRouter.post("todo/add",addTask);
controllerRouter.post("todo/update",updateTask);
controllerRouter.post("todo/delete",deleteTask);
controllerRouter.get("todo/read",readTask);

module.exports = controllerRouter;