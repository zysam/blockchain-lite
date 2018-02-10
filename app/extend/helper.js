'use strict';

const uuid = require('uuid/v4');
const crypto = require('crypto');

module.exports = {
  hash256(block) {
    const hash = crypto.createHash('sha256');
    if (typeof block === 'object') {
      block = JSON.stringify(block);
    }
    hash.update(block);
    const str = hash.digest('hex');
    return str;
  },
  stringifyByOrder(obj) {
    return JSON.stringify(obj, Object.keys(obj).sort());
  },
  get nodeId() {
    return uuid().replace(/\-/g, '');
  },
};
