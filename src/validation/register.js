const validator = require('validator')
const isEmpty = require('is-empty')

function validateRegisterInput(data) {
    let errors = {}

    // convert all empty input to empty strings because validator only works with strings
    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : ""
    data.email = !isEmpty(data.email) ? data.email : ""

    // check username
    if (validator.isEmpty(data.firstName)) {
        errors.firstName = 'First name cannot be blank.'
    }
    if (validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last name cannot be blank.'
    }

    // check email
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email cannot be blank.'
    } else if (!validator.isEmail(data.email)) {
        errors.email = 'Invalid email format.'
    }

    // check password
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password cannot be blank.'
    }
    if (validator.isEmpty(data.rePassword)) {
        errors.rePassword = 'Password should be confirmed.'
    }
    if (!validator.isLength(data.password, {min: 6, max: 30})) {
        errors.password = 'Password must be at least 6 characters and no more than 30 characters.'
    }
    if (!validator.equals(data.password, data.rePassword)) {
        errors.rePassword = 'The repeated password does not match.'
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}

module.exports = validateRegisterInput
