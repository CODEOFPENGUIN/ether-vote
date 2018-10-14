
function Web3AddVote(){
    var voteInstance;
    var vName = $("#vName").val();
    web3App.contracts.voteContract.deployed().then(function(instance) {
      voteInstance = instance;
      console.log(web3App.currAccount);
      return voteInstance.addVote(vName, {from:web3App.currAccount});
    }).then(function(){
      alert("Complete.");
    }).then(function(){
      Web3GetVoteLIst();
    }).catch(function(err) {
      console.log(err.message);
    });
}

function Web3GetVoteLIst(){
  var voteInstance;
  var vName = $("#vName").val();
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getVoteSeq.call();
  }).then(function(voteSeq){
    console.log("voteSeq:"+voteSeq);
    $("#voteList").empty();
    for(var i =0; i < voteSeq; i++){
      voteInstance.getVoteName.call(i).then(function(value){
          console.log("voteSeq:" + value[0] + " name:" + value[1]);
          $("#voteList").append($("<option></option>").attr("value", value[0]).text(value[1]));
    
      });
    }
  }).catch(function(err) {
    console.log(err.message);
  });
}

function Web3AddCandidate(){
  var voteInstance;
  var vSeq = $('#voteList').val();
  var cName = $("#cName").val();
  var img = $("#imgPath").val();
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.addCandidate(vSeq,cName,img, {from:web3App.currAccount});
  }).then(function(){
    alert("Complete.");
  }).then(function(){
    console.log("Success");
  }).catch(function(err) {
    console.log(err.message);
  });
}

function Web3GetCandidateList(){
  var voteInstance;
  var vSeq =$('#voteList').val();
  web3App.contracts.voteContract.deployed().then(function(instance) {
    voteInstance = instance;
    return voteInstance.getCandidateCnt.call(vSeq);
  }).then(function(cSeq){
    $("#candidate-tbody").empty();
    for(var i =0; i < cSeq; i++){
      voteInstance.getCandidateList.call(vSeq, i).then(function(value){
          console.log("name:" + value[0] + " imgPath:" + value[1]);
          var row = $("#candidate-tbody").append($('<tr></tr>').attr("class","gradeA odd").attr("role", "row"));
          row.append($("<td></td>").attr("class", "sorting_1").text(value[0]));
          row.append($("<td></td>").text(value[1]));
          
      });
    }
  }).catch(function(err) {
    console.log(err.message);
  });
}

function setVoteSeq(){
  $('#vote-seq').text($('#voteList').val());
}

$(document).ready(function(){
  $(document).on('click', '#btn-addVote', Web3AddVote);
  $(document).on('click', '#btn-getVote', Web3GetVoteLIst);
  $(document).on('click', '#btn-addCandidate', Web3AddCandidate);
  $(document).on('click', '#btn-getCandidate', Web3GetCandidateList);
  $(document).on('change','#voteList',setVoteSeq);

});