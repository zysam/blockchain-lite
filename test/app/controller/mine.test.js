'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/mine.test.js', () => {

  it('should assert', function* () {
    const pkg = require('../../../package.json');
    assert(app.config.keys.startsWith(pkg.name));

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  });

  it('should POST /mines', async () => {
    app.mockCsrf();
    const { body } = await app.httpRequest()
      .post('/mines')
      .expect(200);
    console.log(body);
  });
});
