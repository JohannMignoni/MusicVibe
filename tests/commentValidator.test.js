const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { validateCommentContent } = require('../modules/comment/commentValidator');
const { VALIDATION } = require('../config/constants');

describe('Validação de Comentários (modules/comment/commentValidator.js)', () => {
    it('deve aceitar um comentário válido dentro do limite de 280 caracteres', () => {
        const result = validateCommentContent('  Adorei esse cover acústico!  ');
        assert.equal(result.valid, true);
        assert.equal(result.value, 'Adorei esse cover acústico!');
    });

    it('deve recusar comentário vazio ou apenas espaços', () => {
        const result = validateCommentContent('   ');
        assert.equal(result.valid, false);
    });

    it('deve recusar comentário acima do limite VALIDATION.COMMENT_MAX (280)', () => {
        const longComment = 'a'.repeat(VALIDATION.COMMENT_MAX + 1);
        const result = validateCommentContent(longComment);
        assert.equal(result.valid, false);
        assert.match(result.message, /280/);
    });
});
