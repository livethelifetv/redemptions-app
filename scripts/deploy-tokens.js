const logDeploy = require('@aragon/os/scripts/helpers/deploy-logger')
const getAccounts = require('./helpers/get-accounts')

const globalArtifacts = this.artifacts // Not injected unless called directly via truffle
const globalWeb3 = this.web3 // Not injected unless called directly via truffle

const defaultOwner = process.env.OWNER

module.exports = async (
  truffleExecCallback,
  {
    artifacts = globalArtifacts,
    web3 = globalWeb3,
    owner = defaultOwner,
    verbose = true,
  } = {}
) => {
  const log = (...args) => {
    if (verbose) {
      console.log(...args)
    }
  }

  if (!owner) {
    const accounts = await getAccounts(web3)
    owner = accounts[0]
    log(
      `No OWNER environment variable passed, setting ENS owner to provider's account: ${owner}`
    )
  }

  const BasicToken = artifacts.require('BasicErc20')

  const valutAddress = '0x7f10285bc6b2f53e364aee91f996d6053897a50c'

  log('Deploying BasicTokens...')
  const token0 = await BasicToken.new()
  //const token1 = await BasicToken.new()
  //await logDeploy(token0, { verbose })

  //await logDeploy(token1, { verbose })

  console.log('#################################################')

  token0.transfer(valutAddress, 100)

  console.log("VAULT BALANCE")

  console.log(await token0.balanceOf(valutAddress));


  if (typeof truffleExecCallback === 'function') {
    // Called directly via `truffle exec`
    truffleExecCallback()
  } else {
    return {
      // ens: ENS.at(ensAddr),
      // ensFactory: factory,
    }
  }
}
