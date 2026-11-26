const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const constants = require('../config/constants');
const { isAuthenticated } = require('../middlewares/auth');

describe('Configurações do MusicVibe (config/constants.js)', () => {
    it('deve definir o nome da aplicação e o limite máximo de duração de vídeo em 60s', () => {
        assert.equal(constants.APP_NAME, 'MusicVibe');
        assert.equal(constants.MAX_VIDEO_DURATION_SECONDS, 60);
    });

    it('deve definir limites coerentes de validação de campos', () => {
        assert.ok(constants.VALIDATION.USERNAME_MIN < constants.VALIDATION.USERNAME_MAX);
        assert.ok(constants.VALIDATION.PASSWORD_MIN >= 6);
        assert.equal(constants.VALIDATION.TITLE_MAX, 100);
        assert.equal(constants.VALIDATION.DESCRIPTION_MAX, 500);
        assert.equal(constants.VALIDATION.COMMENT_MAX, 280);
    });
});

describe('Middleware de Autenticação (middlewares/auth.js)', () => {
    it('deve permitir acesso quando o usuário está autenticado na sessão', () => {
        let nextCalled = false;
        const req = { session: { user: { id: 1, username: 'johann' } } };
        const res = {};
        isAuthenticated(req, res, () => {
            nextCalled = true;
        });
        assert.equal(nextCalled, true);
    });

    it('deve redirecionar para /login quando não há usuário na sessão', () => {
        let redirectedTo = null;
        let flashType = null;
        const req = {
            session: {},
            flash: (type) => {
                flashType = type;
            },
        };
        const res = {
            redirect: (url) => {
                redirectedTo = url;
            },
        };
        isAuthenticated(req, res, () => {
            assert.fail('next() não deveria ser chamado para usuário não autenticado');
        });
        assert.equal(flashType, 'error');
        assert.equal(redirectedTo, '/login');
    });
});
