$(document).ready(function(){
    web3App.init();
    $('#btn-votesearch').on('click', searchVoteList);
});

function searchVoteList(){
    
    var target = $('#votelist');
    Web3GetVoteLIst(target);
}