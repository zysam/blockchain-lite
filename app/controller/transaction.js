'use strict';

const Controller = require('egg').Controller;

class BlockchainController extends Controller {
  async create() {
    this.ctx.validate({
      sender: 'string',
      recipient: 'string',
      amount: 'int',
    });
    const { blockchain } = this.ctx.service;
    const index = await blockchain.newTransaction(this.ctx.request.body);

    this.ctx.body = {
      messages: `Transnsaction will be add to block ${index}`,
    };
  }
}

module.exports = BlockchainController;
