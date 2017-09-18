'use strict';

const bcoin = require('../..');
const MTX = bcoin.mtx;

const fundingTarget = 100000000; // 1 BTC

(async () => {
// Step 1: Create a blank mtx
const fundMe = new MTX();

// Step 2:
// Add an output with the target amount
// you would like to raise and an address you control
const fundeeWallet = await new bcoin.http.Wallet({
    id: 'foo',
    network: 'testnet'
  });
const fundeeAddress = await fundeeWallet.createAddress('default');
console.log(fundeeWallet);
// need this because can't serialize and output mtx with no input
fundMe.addInput(new bcoin.primitives.Input());

fundMe.addOutput({value: fundingTarget, address: fundeeAddress.address });

// Step 3: Get funder wallet and find coins for amount to fund

// Step X: Fund/sign the mtx with an input

console.log('transaction: ', fundMe);
})();

/** *****
NOTES:
- need to account for change addresses:
    - only "exact" UTXOs added, so process for in-exact would be
      to split a UTXO first sending to yourself
- need to account for who pays the fee
  - maybe the receiver adds one final input that is entirely for fee
=======
- need to account for change addresses
- need to account for who pays the fee (probably should be the receiver)
***** **/
