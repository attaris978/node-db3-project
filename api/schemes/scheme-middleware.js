const {getSchemeName} = require('../schemes/scheme-model');

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = (req, res, next) => {
  getSchemeName(req.params.scheme_id)
  .then( name => {
    name.length === 0 ?  
    res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found`}) :
    next()
  })
  // .catch(() => res.status(404).json({message: `scheme with scheme_id ${req.params.scheme_id} not found`}) )

}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const {scheme_name: name} = req.body
  !name || typeof name !== 'string' ? 
    res.status(400).json({message: "invalid scheme_name"}) :
    next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const {step_number : step, instructions} = req.body
  !instructions || typeof instructions !== 'string'
  || step < 1 || typeof step !== 'number' ? 
    res.status(400).json({message: "invalid step"}) :
    next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
