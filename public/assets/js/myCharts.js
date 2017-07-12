$(document).ready(function(){

localStorage.setItem("label"," ");

$("#charts-btn").click(function(){
    $("#main-info").html("");
    $("#chart").html("<canvas id='myChart' width='400' height='125'></canvas>");

    var currentDate = moment().format("l");
    console.log("Date: " + currentDate);

$.get("/data", function(data){
        console.log("DATA 0: " + data[0].amount);
    });

var array30 = [];
for(i = 30; i > 0; i--){
    array30.push(i);
};



var sampleData = [];
for(i = 30; i > 0; i--){
    var a = Math.random() * (25 - 0) + 0;
    sampleData.push(a);
};



var label = localStorage.getItem("label");

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: array30,
        datasets: [{
            label: label,
            data: sampleData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

$("#sort-area").html("<div class='col-md-12' id='sorting'>                            <div class='panel-body' id='sorting-area'>                                <div class='col-md-2'>                                    <h1 id='sort-h1'>Sort by: </h1>                                </div>                                <div class='col-md-8'>                                    <form id='sorting-form'><p><input type='radio' id='s-total' name='sort-radio' value='Total Spent'> Total Spent <input type='radio' id='s-card-w' name='sort-radio' value='Card Withdrawals'> Card Withdrawals <input type='radio' id='s-card-d' name='sort-radio' value='Card Deposits'> Card Deposits <input type='radio' id='s-cash-w' name='sort-radio' value='Cash Spent'> Cash Spent <input type='radio' id='s-cash-d' name='sort-radio' value='Cash Added'> Cash Added </p></form>                                </div>                                <div class='col-md-2'>                                    <h1 id='sort-h1'><button id='sort-btn'>Go!</button></h1>                                </div>                            </div>                        </div>");

});

$("#sort-btn").click(function(){
    label = $('input[name=sort-radio]:checked').val();
    localStorage.setItem("label",label);
    $("#charts-btn").click();
});

});