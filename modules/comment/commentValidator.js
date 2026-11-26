const { body, validationResult } = require('express-validator');
const { VALIDATION } = require('../../config/constants');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const firstError = errors.array()[0].msg;
    const error = new Error(firstError);
    error.status = 400;
    error.errors = errors.array();
    throw error;
};

exports.validateCommentContent = (content) => {
    if (typeof content !== 'string' || content.trim().length === 0) {
        return { valid: false, message: 'O comentário não pode ser vazio.' };
    }
    if (content.trim().length > VALIDATION.COMMENT_MAX) {
        return {
            valid: false,
            message: `O comentário deve ter no máximo ${VALIDATION.COMMENT_MAX} caracteres.`,
        };
    }
    return { valid: true, value: content.trim() };
};

exports.commentValidator = [
    body('content')
        .notEmpty()
        .withMessage('O comentário não pode ser vazio.')
        .isLength({ max: VALIDATION.COMMENT_MAX })
        .withMessage(`O comentário deve ter no máximo ${VALIDATION.COMMENT_MAX} caracteres.`)
        .trim(),
    validate
];