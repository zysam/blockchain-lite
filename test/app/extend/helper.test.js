'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/extend/helper.test.js', () => {

  it('should hash', function() {
    const ctx = app.mockContext();
    const block = {
      index: 1,
      timestamp: 1517768610172,
      proof: 1234,
    };

    const hash = ctx.helper.hash256(block);
    // console.log(hash);
    assert(hash === '132e0c495ae5b77f5fdaed08f41c32829a8f59595d1ed2811fdecc11f70883e0');
  });
  it('should stringifyByOrder', function() {
    const ctx = app.mockContext();
    const block = {
      index: 1,
      timestamp: Date.now(),
      proof: 1234,
      transations: [{
        sender: '123',
        recipient: 'abc',
        amount: 5,
      }],
    };

    const str = ctx.helper.stringifyByOrder(block);
    console.log('[str]', str);
    assert(str);
  });
  it('should get uuid', () => {
    const ctx = app.mockContext();
    const id = ctx.helper.nodeId;
    console.log(id);
    assert(id);
  });
});
