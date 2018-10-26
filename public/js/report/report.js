
$(document).ready(function(){
    web3App.initCallback(init);
    // var data = [{
    //     label: "Series 0",
    //     data: 1
    // }, {
    //     label: "Series 1",
    //     data: 3
    // }, {
    //     label: "Series 2",
    //     data: 9
    // }, {
    //     label: "Series 3",
    //     data: 20
    // }];
    // iniPieChart($("#flot-pie-chart"), data);
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
    console.log(value);
    jsonObj = $.parseJSON(value);
    console.log(jsonObj);
    

    //iniPieChart($("#flot-pie-chart"), jsonObj);
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

}
function drawChart() {

    var data = new google.visualization.DataTable();

    // Declare columns
    data.addColumn('string', 'Name');
    data.addColumn('number', 'Count');
    
    $.each(jsonObj, function() {
        console.log(this.label + ":" + this.data);
        data.addRow([this.label, Number(this.data)]);
    });
    console.log(data);
    var options = {
      title: 'Vote Count'
    };

    var chart = new google.visualization.PieChart(document.getElementById('flot-pie-chart'));

    chart.draw(data, options);
}

//Flot Pie Chart
function iniPieChart(target, data) {

    var plotObj = $.plot(target, data, {
        series: {
            pie: {
                show: true
            }
        },
        grid: {
            hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
            content: "%p.0%, %s", // show percentages, rounding to 2 decimal places
            shifts: {
                x: 20,
                y: 0
            },
            defaultTheme: false
        }
    });

};