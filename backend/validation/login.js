const validator = require('validator')
const empty = require('is-empty')

function validateLoginInput(data) {
    let errors = {}

    // convert all empty input to empty strings because validator only works with strings
    data.email = !empty(data.email) ? data.email : ""
    data.password = !empty(data.password) ? data.password : ""

    // check email
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email is required.'
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email format.'
    }

    // check password
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password is required.'
    }

    return {
        errors,
        isValid: empty(errors)
    }

}

module.exports = validateLoginInput
