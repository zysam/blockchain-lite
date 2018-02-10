'use strict';

const Controller = require('egg').Controller;

class NodeController extends Controller {
  async register() {
    const ctx = this.ctx;
    const { blockchain } = this.ctx.service;
    const body = ctx.request.body;
    ctx.validate({
      nodes: {
        type: 'array',
        itemType: 'ipAddr',
      },
    }, body);

    blockchain.registerNodes(body.nodes);

    ctx.body = {
      message: 'New nodes have been added',
      totalNodes: blockchain.nodes,
    };
  }
  async resolve() {
    const { blockchain } = this.ctx.service;
    const replaced = await blockchain.resolveConflicts();
    const message = replaced
      ? 'Our chain was replaced'
      : 'Our chain is authoritative';
    this.ctx.body = {
      message,
      chain: blockchain.chain,
    };
  }
}

module.exports = NodeController;
