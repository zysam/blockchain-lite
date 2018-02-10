'use strict';

const Controller = require('egg').Controller;

class ChainController extends Controller {
  async list() {
    const { blockchain } = this.ctx.service;
    this.ctx.body = {
      chain: blockchain.chain,
      length: blockchain.len,
    };
  }
}

module.exports = ChainController;
