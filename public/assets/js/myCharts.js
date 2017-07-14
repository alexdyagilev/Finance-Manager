$(document).ready(function(){

var dataArr = [];
var new22 = [];
// console.log("ARRAY TYPE: "+typeof dataArr);

localStorage.setItem("label"," ");

$("#charts-btn").click(function(){
    dataArr = [];
    $("#main-info").html("");
    $("#chart").html("<canvas id='myChart' width='400' height='140'></canvas>");

    $("#sort-area").html("<div class='col-md-12' id='sorting'>                            <div class='panel-body' id='sorting-area'>                                <div class='col-md-2'>                                    <h1 id='sort-h1'>Sort by: </h1>                                </div>                                <div class='col-md-8'>                                    <form id='sorting-form'><p><input type='radio' id='s-total' name='sort-radio' value='Total Spent' checked=true> Total Spent <input type='radio' id='s-card-w' name='sort-radio' value='Card Withdrawals'> Card Withdrawals <input type='radio' id='s-card-d' name='sort-radio' value='Card Deposits'> Card Deposits <input type='radio' id='s-cash-w' name='sort-radio' value='Cash Spent'> Cash Spent <input type='radio' id='s-cash-d' name='sort-radio' value='Cash Added'> Cash Added </p></form>                                </div>                                <div class='col-md-2'>                                    <h1 id='sort-h1'><button id='sort-btn'>Go!</button></h1>                                </div>                            </div>                        </div><script>$('#sort-btn').click(function(){    label = $('input[name=sort-radio]:checked').val();    localStorage.setItem('label',label);    $('#charts-btn').click();});</script>");


var array30 = [];
for(i = 31; i > 0; i--){
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    var day = new Date(new Date().setDate(new Date().getDate() - (i-1)));
    var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate();
    array30.push(dayFormat);
};

var sampleData = [""];

// console.log("DATA ARR: "+dataArr);

$.get("/data", function(data){
    localStorage.setItem("label","Total Spent");
        var size = Object.keys(data).length;
        // console.log("LABEL: "+localStorage.getItem('label').trim());
        // console.log("data date: "+data[1].date);
        // console.log("date type: "+typeof data[1].date);
        // var today = "" + new Date();
        //     console.log("today: "+today);
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ];
        var count = 0;
        for(i = 31; i > 0; i--){
            count = 0;
            // console.log("I count: "+i+"... COUNT= "+count);
            var day = new Date(new Date().setDate(new Date().getDate() - (i-1)));
            var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate();
            // console.log("CHART DATE: "+dayFormat+", I count: "+i);
            for(k = 0; k < size; k++){
                // console.log("2nd for loop!");
                if(localStorage.getItem('label').trim() == "Total Spent"){
                    // console.log("label is total spent!")
                    // console.log("DATA DATE: "+data[k].date);
                    
                    // console.log("DATA TYPE: "+typeof data[k].date);
                    if(dayFormat==data[k].date){
                        // console.log("DATA AMOUNT: "+data[k].amount)
                        // console.log("DATA TYPE: "+typeof data[k].amount)
                        dataArr.push(data[k].amount);
                        
                        // console.log("ARRAY length: "+dataArr.length+", I: "+i+", K: "+k);
                        count = 1;
                        // console.log("MATCH!!!!!");
                    }
                    else {
                        // console.log("NO MATCH...");
                    }
                }
            };
            if (count == 0) {
                dataArr.push(0);
            }
        };

        new22 = [];
        
        for(i = 0; i < dataArr.length; i ++){
            new22.push(dataArr[i]);
        }
        console.log("ARRAY 1: "+dataArr);
        console.log("ARRAY 2: "+new22);

        // console.log("LENGTH: "+dataArr.length);
        // console.log("TYPE: "+typeof dataArr);

    });

for(i = 31; i > 0; i--){
    
    var a = Math.random() * (115 - 0) + 0;
    sampleData.push(a);
};


var label = localStorage.getItem("label");

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: array30,
        scaleOverride : true,   
        scaleSteps : 10,
        scaleStepWidth : 5,
        scaleStartValue : 0, 
        xAxisID: "Last 30 Days",
        yAxisID: "$",
        datasets: [{
            label: label,
            data: new22,
            backgroundColor: [
                '#80f7bd'
            ],
            pointBorderColor:
                '#02871a',
            pointHoverBackgroundColor:
                '#00abb7',
            borderColor: [
                '#3f7a5d'
            ],
            borderWidth: 3
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



});



});

