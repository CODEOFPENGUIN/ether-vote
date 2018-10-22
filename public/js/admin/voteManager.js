$(document).ready(function(){
    web3App.init();
    $('#btn-votesearch').on('click', searchVoteList);
    $('#btn-addVote').on('click', addVote);
    $('#btn-addCandidate').on('click', addCandidate);
    $('#btn-getCandidate').on('click', searchBtncandidate);
    
    var address = $('#token').val();
    if(address){
        web3App.setAccount(address);
    }
});

function searchVoteList(){
    
    var target = $('#votelist');
    target.empty();
    Web3GetVoteLIst(searchCallback);
}

function searchCallback(val){
    var target = $('#votelist');    
    var html = "<tr onclick='votelistSelectRow(\"" + val[0].toString().trim() + "\",\"" + val[1] + "\")'><td>" + val[1] + "</td></tr>";
    target.append(html);
}

function votelistSelectRow(key, val){
    $('#voteseq').val(key);
    $('#votename').text(val);
    $("#candidate-tbody").empty();
    searchCandidate(key);
}

function searchBtncandidate(){
    var seq = $('#voteseq').val();
    if(!seq || seq == ""){
        alert("투표를 선택해 주세요.")
        return false;
    }
    searchCandidate(seq);
}

function searchCandidate(seq){
    Web3GetCandidateList(seq, searchCandidateCallback);
}

function searchCandidateCallback(value){
    //console.log("name:" + value[0] + " imgPath:" + value[1]);
    var row = $("#candidate-tbody").append($('<tr></tr>').attr("class","gradeA odd").attr("role", "row"));
    row.append($("<td></td>").attr("class", "sorting_1").text(value[0]));
    row.append($("<td></td>").text(value[1]));    
}

function addVote(){
    
    var target = $('#votelist');
    target.empty();
    var voteName = $('#vName').val();
    Web3AddVote(voteName, addCallback);
}

function addCallback(val){
    searchCallback(val);
}

function addCandidate(){
    var vSeq = $('#voteseq').val();
    var cName = $("#candidate-name").val();
    var img = $("#candidate-imgPath").val();
    console.log(vSeq);
    if(!vSeq || vSeq == ""){
        alert("투표를 선택해 주세요.")
        return false;
    }
    Web3AddCandidate(vSeq, cName, img, addCandidateCallback);
}

function addCandidateCallback(code, msg){
    alert(msg);
    if(code == "S"){
        searchBtncandidate();
    }
}