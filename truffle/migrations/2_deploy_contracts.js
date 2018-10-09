//var owner = artifacts.require("Ownable");
var VoteContract = artifacts.require("VoteContract");
module.exports = function(deployer) {
  //deployer.deploy(owner);
  deployer.deploy(VoteContract);
};