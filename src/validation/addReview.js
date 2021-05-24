const empty = require('is-empty')
const validator = require('validator')

function validateReviewInfo(data) {
    let errors = {}

    data.title = !empty(data.title) ? data.title : ''
    data.text  =!empty(data.text) ? data.text : ''
    data.score = !empty(data.score) ? data.score : ''

    if (validator.isEmpty(data.title)) {
        errors.title = 'Review title is required.'
    }

    if (validator.isEmpty(data.text)) {
        errors.text = 'Review text is required.'
    }

    if (validator.isEmpty(data.score)) {
        errors.score = 'Review score is required.'
    } else if (!validator.isInt(data.score, {min: 1, max: 5})) {
        errors.scoreNotValid = 'Review score must be an integer range [1, 5]'
    }

    return {
        errors,
        isValid: empty(errors)
    }
}

module.exports = validateReviewInfo
