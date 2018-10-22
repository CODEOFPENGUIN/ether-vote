$(document).ready(function(){
    web3App.init();
    $('#btn-votesearch').on('click', searchVoteList);
    $('#votelist').on('change', selectVote);
    $(document).on('click', '#btn-vote', vote);
    var address = $('#token').val();
    if(address){
        web3App.setAccount(address);
    }
});

function searchVoteList(){
    
    var target = $('#votelist');
    target.empty();
    target.append($('<option></option>'))
    Web3GetVoteLIst(searchCallback);
}
function searchCallback(val){
    var target = $('#votelist');    
    var html = "<option value=\"" + val[0].toString().trim() + "\">" + val[1] + "</option>";
    target.append(html);
}

function selectVote(){
    var vSeq = $('#votelist').val();
    $('#vote-row').empty();
    if(vSeq && vSeq != ""){
        getIsVoted(vSeq);
    }
}

function getIsVoted(vSeq){
    var address = $('#token').val();
    Web3IsVoted(vSeq, address, getIsVotedCallback);
}
var isVoted = false;

function getIsVotedCallback(val){
    console.log(val[1]);
    isVoted = val[1];
    searchCandidate(val[0]);
}

function searchCandidate(vSeq){    
    var address = $('#token').val();
    
    Web3GetCandidateWithVotedList(vSeq, address, searchCandidateCallback);
}

function searchCandidateCallback(val){
    var row = $('#vote-row');
    var templete = $('#templete');

    templete.find('#name').text(val[1]);
    templete.find('#candidate-img').attr('src', val[2]);
    var $btn = templete.find('#btn-vote');
    if(isVoted){        
        console.log(val[3]);
        if(val[3]){
            if($btn.hasClass("btn-default")){
                $btn.removeClass("btn-default");
            }
            if(!$btn.hasClass("btn-info")){
                $btn.addClass("btn-info");
            }
            if(!$btn.hasClass("disabled")){
                $btn.addClass("disabled");
            }
            $btn.css('display', '');
        }
        else {
            $btn.removeClass("disabled");
            $btn.css('display', 'none');
        }
    }
    else{
        if(!$btn.hasClass("btn-default")){
            $btn.addClass("btn-default");
        }
        if($btn.hasClass("btn-info")){
            $btn.removeClass("btn-info");
        }
        $btn.css('display', '');
        if($btn.hasClass("disabled")){
            $btn.removeClass("disabled");
        }
    }
    $btn.attr("data", val[0]);
    row.append(templete.html());
}

function vote(){
    var username = $('#username').val();
    var cSeq = $(this).attr("data");
    var vSeq = $('#votelist').val();
    if(!isVoted && !$(this).hasClass("disabled")){
        Web3Vote(vSeq, cSeq, username, voteCallback);   
    }    
}

function voteCallback(code, msg){
    alert(msg);
    if(code == "S"){
        var vSeq = $('#votelist').val();
        $('#vote-row').empty();
        getIsVoted(vSeq);
    }
}