'use strict';

const reIpAddr = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):[0-9]{1,5}$/;

module.exports = app => {
  app.validator.addRule('ipAddr', reIpAddr);
  // app.beforeStart(async () => {
  //   const blockchain = this.ctx.service.blockchain;
  //   blockchain.newBlock(100, 1);
  // });
};

