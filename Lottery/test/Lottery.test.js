const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const provider = ganache.provider()
const web3 = new Web3(provider)
const { interface, bytecode } = require('../compile')

let accounts;
let lottery;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts()

    lottery = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' })

    lottery.setProvider(provider)
});

describe('Lottery Contract', () => {

    it('deploys a contract', () => {
        console.log('hi there!!!')
        assert.ok(lottery.options.address)
    })
});
