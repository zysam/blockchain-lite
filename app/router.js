'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/transactions', controller.transaction.create);
  router.post('/mines', controller.mine.start);
  router.get('/chains', controller.chain.list);
  router.get('/nodes/resolve', controller.node.resolve);
  router.post('/nodes/register', controller.node.register);
};
