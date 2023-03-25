const Joi = require('joi');
const { checkUsername } = require('../models/User');

const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .min(8)
    .max(32)
    .required(),
});
const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
    .min(8)
    .max(32)
    .required(),
  repeatPassword: Joi.any().valid(Joi.ref('password')).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});
function validateLogin(req, res, next) {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      error: error.details[0].message,
    });
  }
  next();
}
async function validateSignup(req, res, next) {
  const { error } = signupSchema.validate(req.body);
  console.info(req.body);
  if (error) {
    return res.status(400).json({
      status: false,
      error: error.details[0].message,
    });
  }
  let isExists = await checkUsername(req.body.username);
  if (isExists) {
    return res.status(400).json({
      status: false,
      error: 'username is not available',
    });
  }
  next();
}

module.exports = { validateLogin, validateSignup };
