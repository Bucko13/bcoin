'use strict';

const bcoin = require('../..');
const MTX = bcoin.mtx;
const Keyring = bcoin.keyring;

/**
Part 1

This is mostly setup so that we have some phony funded wallets.
If you're testing this on a real network you can use existing
wallets that have funds already.
**/

// Let's setup our wallets for a fundee and 2 funders

// Create an HD master keypair.
const master = bcoin.hd.generate();

// Derive private hd key for fundee and create a "keyring" object.
// A keyring object is basically a key manager that
// is also able to tell you info such as: your redeem script, your scripthash,
// your program hash, your pubkey hash, your scripthash program hash, etc.

const fundeeKey = master.derive(0);
const fundeeKeyring = new Keyring(fundeeKey.privateKey);

// Derive 2 more private hd keys and keyrings for funders
const funder1Key = master.derive(1);
const funder1Keyring = new Keyring(funder1Key.privateKey);

const funder2Key = master.derive(2);
const funder2Keyring = new Keyring(funder2Key.privateKey);

const funders = [funder1Keyring, funder2Keyring];

// create some coinbase transactions to fund our wallets
for(let i=0; i < funders.length; i++) {

}
const cb = new bcoin.mtx();
