
$(document).ready(function(){
    web3App.initCallback(init);
    $('#btn-votesearch').on('click', search);
    var address = $('#token').val();
    if(address){
        web3App.setAccount(address);
    }
});

function init(){
    search();
}

function search(){
    Web3GetVotesCount(searchCallback);
}
var jsonObj;
function searchCallback(value){
    jsonObj = $.parseJSON(value);
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawVoteChart);

}
function drawVoteChart() {

    var row = $('#chart-vote');
    var templete = $('#templete-pie');
    templete.find('span[name="title"]').text("Vote");
    var obj = $(templete.html());
    row.append(obj);
    var cObj = obj.find('div[name="flot-pie-chart"]');

    var data = new google.visualization.DataTable();

    // Declare columns
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Count');
    data.addColumn('number', 'seq');
    var i = 0;
    $.each(jsonObj, function() {
        data.addRow([this.label, Number(this.data), i++]);
    });
    var options = {
      title: 'Vote Count'
    };

    var chart = new google.visualization.PieChart(cObj.get(0));

    function selectVoteHandler(){
        var selectedItem = chart.getSelection()[0];
        if(selectedItem){        
          var value = data.getValue(selectedItem.row, 2);
          searchCandidateVoteCount(value);
        }
    }

    google.visualization.events.addListener(chart, 'select', selectVoteHandler);

    chart.draw(data, options);
}

function searchCandidateVoteCount(vSeq){
    Web3GetCandidateVoteCount(vSeq, searchCandidateVoteCallback);
}


function searchCandidateVoteCallback(value){
    jsonObj = $.parseJSON(value);
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCandidateVoteChart);

}
function drawCandidateVoteChart() {

    var row = $('#chart-detail');
    var templete = $('#templete-pie');
    templete.find('span[name="title"]').text("투표현황");
    var obj = $(templete.html());
    row.append(obj);
    var cObj = obj.find('div[name="flot-pie-chart"]');


    var data = new google.visualization.DataTable();

    // Declare columns
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Count');
    data.addColumn('number', 'seq');
    var i = 0;
    $.each(jsonObj, function() {
        data.addRow([this.label, Number(this.data), i++]);
    });
    var options = {
      title: '투표현황'
    };

    var chart = new google.visualization.PieChart(cObj.get(0));

    chart.draw(data, options);
}