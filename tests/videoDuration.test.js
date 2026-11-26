const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { validateVideoDuration } = require('../modules/video/videoValidator');
const { MAX_VIDEO_DURATION_SECONDS } = require('../config/constants');

describe('Validação de Duração de Vídeo (modules/video/videoValidator.js)', () => {
    it('deve aceitar vídeos com duração válida entre 1 e 60 segundos', () => {
        assert.deepEqual(validateVideoDuration(1), { valid: true, durationSeconds: 1 });
        assert.deepEqual(validateVideoDuration(30), { valid: true, durationSeconds: 30 });
        assert.deepEqual(validateVideoDuration(MAX_VIDEO_DURATION_SECONDS), {
            valid: true,
            durationSeconds: MAX_VIDEO_DURATION_SECONDS,
        });
    });

    it('deve recusar vídeos com duração zero ou negativa', () => {
        const zero = validateVideoDuration(0);
        const negative = validateVideoDuration(-10);
        assert.equal(zero.valid, false);
        assert.equal(negative.valid, false);
    });

    it('deve recusar vídeos que ultrapassem MAX_VIDEO_DURATION_SECONDS (60s)', () => {
        const tooLong = validateVideoDuration(MAX_VIDEO_DURATION_SECONDS + 1);
        assert.equal(tooLong.valid, false);
        assert.match(tooLong.message, /60/);
    });

    it('deve recusar valores não numéricos', () => {
        const invalid = validateVideoDuration('abc');
        assert.equal(invalid.valid, false);
    });
});
