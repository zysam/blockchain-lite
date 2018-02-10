'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/node.test.js', () => {

  it('should POST /nodes/register', async () => {
    app.mockCsrf();
    const data = {
      nodes: [
        '127.0.0.1:8001',
      ],
    };
    const { body } = await app.httpRequest()
      .post('/nodes/register')
      .send(data)
      .expect(200);
    // console.log(body);
    assert.deepEqual(body.totalNodes, data.nodes);
  });
});
