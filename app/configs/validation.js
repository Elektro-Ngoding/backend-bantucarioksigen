const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    id_mitra: Joi.string(),
    username: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .min(8)
      .required(),
    role: Joi.string().required(),
    verify: Joi.string().required()
  });
  return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),  
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidate = loginValidate;

