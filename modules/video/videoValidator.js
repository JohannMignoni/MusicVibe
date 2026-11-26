const { body, validationResult } = require('express-validator');
const { VALIDATION, MAX_VIDEO_DURATION_SECONDS } = require('../../config/constants');

exports.validateVideoDuration = (durationSeconds) => {
    const duration = Number(durationSeconds);
    if (!Number.isFinite(duration) || duration <= 0) {
        return {
            valid: false,
            message: 'A duração do vídeo deve ser maior que 0 segundos.',
        };
    }
    if (duration > MAX_VIDEO_DURATION_SECONDS) {
        return {
            valid: false,
            message: `O vídeo deve ter no máximo ${MAX_VIDEO_DURATION_SECONDS} segundos.`,
        };
    }
    return { valid: true, durationSeconds: duration };
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) {
        return next();
    }
    const firstError = errors.array()[0].msg;
    const error = new Error(firstError);
    error.status = 400;
    error.errors = errors.array();
    throw error;
};

exports.uploadValidator=[
    body('title')
        .notEmpty()
        .withMessage('O título é obrigatório.')
        .isLength({max: VALIDATION.TITLE_MAX})
        .withMessage(`O título deve ter no máximo ${VALIDATION.TITLE_MAX} caracteres.`)
        .trim(),
    body('description')
        .isLength({max: VALIDATION.DESCRIPTION_MAX})
        .withMessage(`A descrição deve ter no máximo ${VALIDATION.DESCRIPTION_MAX} caracteres.`)
        .optional({checkFalsy: true})
        .trim(),
    validate
];