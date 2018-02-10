'use strict';

const Controller = require('egg').Controller;

class BlockchainController extends Controller {
  async create() {
    this.ctx.body = 'transaction';
  }
}

module.exports = BlockchainController;
