
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
    
    getCount();
    

}
var userCount;
function getCount(){
    $.get("/admin/user/getUserCount"
                ,{}
                ,function(result){
                    userCount = result;
                    google.charts.load('current', {'packages':['corechart', 'bar']});
                    google.charts.setOnLoadCallback(drawVoteBarChart);
                })
}

function drawVoteBarChart(){
    var row = $('#chart-vote');
    var templete = $('#templete-vote');
    templete.find('span[name="title"]').text("투표현황");
    var obj = $(templete.html());
    row.append(obj);
    var cObj = obj.find('div[name="flot-pie-chart"]');
    
    var data = new google.visualization.DataTable();
    
    data.addColumn('string', '투표명');
    data.addColumn('number', '투표수');
    data.addColumn('number', '총투표자');
    data.addColumn('number', 'seq');
    
    var i = 0;
    $.each(jsonObj, function() {
        data.addRow([this.label, Number(this.data), Number(userCount), i++]);
    });
    var view = new google.visualization.DataView(data);

    view.setColumns([0,1,2]);
    var options = {
        chart: {
            title: '투표현황',
            subtitle: '현재 투표현황',
        }
    };
    var chart = new google.charts.Bar(cObj.get(0));
    
    function selectVoteHandler(){
        var selectedItem = chart.getSelection()[0];
        if(selectedItem){        
          var _name = data.getValue(selectedItem.row, 0);
          var value = data.getValue(selectedItem.row, 3);
          searchCandidateVoteCount(_name, value);
        }
    }

    google.visualization.events.addListener(chart, 'select', selectVoteHandler);

    chart.draw(view, google.charts.Bar.convertOptions(options));
}
var name = "";
function searchCandidateVoteCount(_name, vSeq){
    name = _name;
    Web3GetCandidateVoteCount(vSeq, searchCandidateVoteCallback);
}


function searchCandidateVoteCallback(value){
    jsonObj = $.parseJSON(value);
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawCandidateVoteChart);

}
function drawCandidateVoteChart() {

    var row = $('#chart-detail');
    if(row.children().length > 0){
        row.empty();
    }
    var templete = $('#templete-detail');
    templete.find('span[name="title"]').text(name);
    var obj = $(templete.html());
    row.append(obj);
    var cObj = obj.find('div[name="flot-pie-chart"]');


    var data = new google.visualization.DataTable();

    // Declare columns
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Count');
    data.addColumn('number', 'seq');
    var i = 0;
    var tb = obj.find('tbody[name="addressList"]');
    tb.html("");
    
    $.each(jsonObj, function() {
        data.addRow([this.label, Number(this.data), i]);
        var tag = this.winner=="Y"?"<i class='fa fa-check-circle fa-fw'></i>":"";
        console.log(tag);
        var html ="<tr><td>" + i++ + "</td><td>"+this.label+"</td><td>"+this.data+"</td><td>"+tag+"</td></tr>";
        console.log(html);
        tb.append(html);
    });
    var options = {
      title: '투표현황'
    };

    var chart = new google.visualization.PieChart(cObj.get(0));

    chart.draw(data, options);
}
