
function Web3AddVote(vName, callBack){
    var voteInstance;
    web3App.contracts.voteContract.deployed().then(function(instance) {
      voteInstance = instance;
      return voteInstance.addVote(vName, {from:web3App.currAccount});
    }).then(function(){
      alert("Complete.");
    }).then(function(){
      Web3GetVoteLIst(callBack);
    }).catch(function(err) {
      console.log(err.message);
    });
}

function Web3GetVoteLIst(callBack){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getVoteSeq.call();
  }).then(function(voteSeq){
    for(var i =0; i < voteSeq; i++){
      voteInstance.getVoteName.call(i).then(function(value){
          callBack(value);
      });
    }
  }).catch(function(err) {
    console.log(err.message);
  });
}

function Web3AddCandidate(vSeq, cName, img, callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.addCandidate(vSeq,cName,img, {from:web3App.currAccount});
  }).then(function(){
    alert("Complete.");
  }).then(function(){
    console.log("Success");
    callback("S", "Success");
  }).catch(function(err) {
    console.log(err.message);
    callback("E", err.message);
  });
}

function Web3GetCandidateList(vSeq, callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getCandidateCnt.call(vSeq);
  }).then(function(cSeq){
    for(var i =0; i < cSeq; i++){
      voteInstance.getCandidateList.call(vSeq, i).then(function(value){
        callback(value);
          
      });
    }
  }).catch(function(err) {
    console.log(err.message);
  });
}

function Web3GetCandidateWithVotedList(vSeq, addr, callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getCandidateCnt.call(vSeq);
  }).then(function(cSeq){
    for(var i =0; i < cSeq; i++){
      voteInstance.getCandidateWithVotedList.call(vSeq, i, addr).then(function(value){
        callback(value);
          
      });
    }
  }).catch(function(err) {
    console.log(err.message);
  });
}

function Web3IsVoted(vSeq, addr, callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.isVoted(vSeq, addr, {from:web3App.currAccount});
  }).then(function(value){
    callback(value);
  }).catch(function(err) {
    console.log(err.message);
  });

}

function Web3Vote(vSeq, cSeq, name, callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.voting(vSeq,cSeq,name, {from:web3App.currAccount, gas:3000000});
  }).then(function(){
    callback("S", "Vote success");
  }).catch(function(err) {
    console.log(err.message);
    callback("E", err.message);
  });

}

function Web3GetVotesCount(callback){
  var voteInstance;
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getVotesCount();
  }).then(function(value){
    callback(value);
  }).catch(function(err) {
    console.log(err.message);
  });

}
function setVoteSeq(){
  $('#vote-seq').text($('#voteList').val());
}
