'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/transaction.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /transactions', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/transactions')
      .expect(200)
      .expect('transaction');
  });
});
