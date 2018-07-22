require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    process.env.MNEMONIC,
    'https://rinkeby.infura.io/v3/9955fbff399747ae9b624226a2948249'
)

const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()

    console.log('Attempting to deploy from', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode, arguments: ['Hi there!'] })
        .send({ gas: '1000000', from: accounts[0] })

    console.log('Result', result.options.address)
}

deploy()