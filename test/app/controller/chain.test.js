'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/chain.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /chains', async () => {
    const { body } = await app.httpRequest()
      .get('/chains')
      .expect(200);
    assert(typeof body.chain === 'object');
  });
});
