const SmartContract = artifacts.require("SmartContract");

module.exports = function (deployer) {
  deployer.deploy(SmartContract,
      '0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe',
      '0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70',
      '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      '0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD',
      3);
};
