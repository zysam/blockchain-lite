'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/blockchain.test.js', () => {
  it('should create new block', async () => {
    const ctx = app.mockContext();
    const bc = ctx.service.blockchain;
    const block = bc.last;
    assert(bc.len === 1);
    assert(block.index === 1);
    assert(block.proof === 100);
    assert(block.previousHash === 1);
  });
});
