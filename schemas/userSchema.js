const Joi = require('joi');

const id = Joi.string().uuid();
const fullName = Joi.string().min(3).max(25);
const email = Joi.string().email();
const username = Joi.string();

const createUserSchema = Joi.object({
  fullName: fullName.required(),
  email: email.required(),
  username: username.required()
});

const updateUserSchema = Joi.object({
  fullName: fullName,
  email: email,
  username: username
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

