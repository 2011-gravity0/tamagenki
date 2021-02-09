const {body, validationResult} = require('express-validator')
const userValidationRules = () => {
  return [
    body('password')
      .isLength({min: 5})
      .withMessage('Must be at least 5 chars long'),
    body('email')
      .isEmail()
      .withMessage('Must be an Email')
  ]
}
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({[err.param]: err.msg}))
  console.log('errors:', errors)
  return res.status(422).send(errors)
}
module.exports = {
  userValidationRules,
  validate
}
