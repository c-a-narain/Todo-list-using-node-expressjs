const {registerSchema, loginSchema} = require('../model/schema')

const registerValidator = (req, res, next) => {
  const result = registerSchema.validate(req.body);

  if (result.error) {
    res.send({
      data: result.error.details,
      message: "Error",
    });
  } else {
    next();
  }
};

const loginValidator = (req, res, next) => {
    const result = loginSchema.validate(req.body);
  
    if (result.error) {
      res.send({
        data: result.error.details,
        message: "Error",
      });
    } else {
      next();
    }
  };

module.exports = { loginValidator,registerValidator };
