'use strict';

const path = require('path');
const bcoin = require('../..');
const Chain = bcoin.chain;
const Logger = bcoin.logger;
const CoinView = bcoin.coinview;
const TX = bcoin.primitives.TX;
const util = bcoin.util;

const HOME = process.env.HOME;

// Setup logger to see what Bcoin is doing.
const logger = new Logger({
  level: 'debug'
});

// Create chain for testnet, specify chain directory
const chain = new Chain({
  logger: logger,
  network: 'testnet',
  db: 'leveldb',
  prefix: path.join(HOME, '.bcoin/testnet'),
  indexTX: true,
  indexAddress: true
});

(async () => {
  await logger.open();
  console.log('logger open');
  await chain.open();

  console.log('Current height:', chain.height);

  const entry = await chain.getEntry(50000);
  console.log('Block at 50k:', entry);

  // eslint-disable-next-line max-len
  const txhash = 'e3d652051b8d7c7d2da58def1be85486deb807851db436b5cb6cca9a45839c6e';
  const txmeta = await chain.db.getMeta(util.revHex(txhash));
  console.log(`Tx with hash ${txhash}:`, txmeta);

  const tx = TX.fromOptions(txmeta);
  const coinView = new CoinView();
  coinView.addTX(tx, 0);
  console.log(`Coins from tx with hash ${txhash}: \n`, coinView);

  const inputsValue = tx.getInputValue(coinView);
  console.log(`Value of inputs from tx with hash ${txhash}`, inputsValue);

  // eslint-disable-next-line max-len
  const bhash = '00000000077eacdd2c803a742195ba430a6d9545e43128ba55ec3c80beea6c0c';
  const block = await chain.db.getBlock(util.revHex(bhash));

  console.log(`Block with hash ${bhash}:`, block);
})().catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
