'use strict';

const Controller = require('egg').Controller;

class MineController extends Controller {
  async start() {
    const { blockchain } = this.ctx.service;
    const last = blockchain.last;
    const lastProof = last.proof;
    const proof = blockchain.proofOfWork(lastProof);

    await blockchain.newTransaction({
      sender: 0,
      recipient: this.ctx.helper.nodeId,
      amount: 1,
    });
    const block = await blockchain.newBlock(proof);
    this.logger.info('block', block, blockchain.chain);
    this.ctx.body = block;
  }
}

module.exports = MineController;
