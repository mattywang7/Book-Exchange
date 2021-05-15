const validator = require('validator')
const empty = require('is-empty')

function validateBookInfo(data) {
    let errors = {}

    data.title = !empty(data.title) ? data.title : ''
    data.author = !empty(data.author) ? data.author : ''
    data.category = !empty(data.category) ? data.category : ''
    data.condition = !empty(data.condition) ? data.condition : ''
    data.price = !empty(data.price) ? data.price : ''

    if (validator.isEmpty(data.title)) {
        errors.title = 'Book title is required.'
    }

    if (validator.isEmpty(data.author)) {
        errors.author = 'Book author is required.'
    }

    if (validator.isEmpty(data.category)) {
        errors.category = 'Book category is required.'
    }

    if (validator.isEmpty(data.condition)) {
        errors.condition = 'Book condition is required.'
    } else if (!validator.isInt(data.condition, {min: 1, max: 5})) {
        errors.conditionNotValid = 'Book condition must be integer ranging in [1, 5].'
    }

    if (validator.isEmpty(data.price)) {
        errors.price = 'Book price is required.'
    } else if (!validator.isDecimal(data.price, {no_symbols: true})) {
        errors.priceNotValid = 'Book price must be numeric.'
    }

    return {
        errors,
        isValid: empty(errors)
    }
}

module.exports = validateBookInfo
