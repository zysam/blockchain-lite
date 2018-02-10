'use strict';

const Service = require('egg').Service;

class BlockchainService extends Service {
  constructor(ctx) {
    super(ctx);
    this._chain = [];
    this._transactions = [];
    this._nodes = new Set();

    this.newBlock(100, 1); // 创世区块
  }
  get curTransactions() {
    return this._transactions;
  }
  clearTransactions() {
    this._transactions = [];
  }
  get schema() {
    return {
      index: 0,
      timestamp: Date.now(),
      transactions: [],
      proof: 0,
      previousHash: '',
    };
  }
  append(block) {
    this._chain.push(block);
    return this._chain;
  }
  get chain() {
    return this._chain;
  }
  set chain(val) {
    this._chain = [].concat(val);
  }

  get len() {
    return this._chain.length;
  }
  get last() {
    return this._chain[this.len - 1];
  }
  get nodes() {
    return [ ...this._nodes ];
  }
  async newTransaction({ sender, recipient, amount }) {
    this._transactions.push({
      sender,
      recipient,
      amount,
    });
    return this.last.index + 1;
  }
  async newBlock(proof, previousHash) {
    const lastBlock = this.last;
    this.ctx.logger.info(lastBlock);

    const block = this.schema;
    block.index = this.len + 1;
    block.proof = proof;
    block.transactions = this.curTransactions;
    block.previousHash = previousHash || this.hash(lastBlock);

    this.clearTransactions();

    this.ctx.logger.info('block', block);
    this.append(block);
    return block;
  }
  hash(block) {
    return this.ctx.helper.hash256(block);
  }
  proofOfWork(lastProof) {
    let proof = 0;
    while (!this.validProof(lastProof, proof)) {
      proof++;
    }
    return proof;

  }
  validProof(lastProof, proof) {
    const guess = `${lastProof}${proof}`;
    const guessHash = this.hash(guess);
    const isProof = guessHash.slice(0, 4) === '0000';
    if (isProof) {
      this.ctx.logger.debug(`guess: ${guess}, hash: ${guessHash}`);
    }
    return isProof;
  }
  validChain(chain) {
    let lastBlock = chain[0];
    let currentIndex = 1;
    while (currentIndex < chain.length) {
      const block = chain[currentIndex];
      if (block.previousHash !== this.hash(lastBlock)) {
        return false;
      }
      if (this.validProof(lastBlock.proof, block.proof)) {
        return false;
      }
      lastBlock = block;
      currentIndex++;
    }
    return true;
  }
  registerNodes(nodes) {
    for (const node of nodes) {
      this._nodes.add(node);
    }
  }
  async resolveConflicts() {
    const neighbours = this.nodes;
    const jobs = neighbours.map(node => this.request(`http://${node}/chains`));
    let chains = await Promise.all(jobs);

    chains = chains.filter(data => data.length && data.chain);
    this.ctx.logger.debug('neighbours chains:', chains);

    let maxLength = this.len;
    let newChain;
    for (const chainObj of chains) {
      const { length, chain } = chainObj;
      if (length < maxLength) continue;
      if (!this.validChain(chain)) continue;
      maxLength = length;
      newChain = chain;
    }
    if (newChain) {
      this.chain = newChain;
      return true;
    }
    return false;
  }
  async request(url, opts = {}) {
    const options = Object.assign({
      dataType: 'json',
      timeout: [ '30s', '30s' ],
    }, opts);
    const result = await this.ctx.curl(url, options);
    return result.data;
  }
}

module.exports = BlockchainService;

