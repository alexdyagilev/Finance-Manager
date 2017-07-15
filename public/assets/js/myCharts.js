//------------------------------------------------------------------------------
//                FINANCIAL MANAGER v1.0
//------------------------------------------------------------------------------
//                  by Alex Dyagilev
//------------------------------------------------------------------------------
//                      myCharts.js -- Draws line and bar graphs with data
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var graphCount = 1; //ODD # --> LINE GRAPH by default

$(document).ready(function(){ //START DOC READY

var dataArr = []; //Y-Axis data first saved here
var yAxisData = []; //Data copied from dataArr
var xAxisData = []; //X-Axis data (Last 30 days)

$("#chart-start").click(function(){ //START chart-start

    if(graphCount % 2 == 0){ //IF graphCount is EVEN --> draw BAR GRAPH
        graph = "bar";
    }
    else{ //IF graphCount is ODD --> draw LINE GRAPH
        graph = "line";
    }
    label = localStorage.getItem("label");
    $("#chart").html("<canvas id='myChart' width='400' height='140' style='background-color: white;'></canvas>");
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, { //START Chart Setup
        type: graph,
        data: {
            labels: xAxisData,
            scaleOverride : true,   
            scaleSteps : 10,
            scaleStepWidth : 5,
            scaleStartValue : 0, 
            xAxisID: "Last 30 Days",
            yAxisID: "$",
            datasets: [{
                label: label,
                data: yAxisData,
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
    }); //END Chart Setup

    localStorage.setItem("label","");
}); //END CHART-START

localStorage.setItem("label","");
var label = "";

$("#charts-btn").click(function(){ //START Chart button click
    //Adds Switch Chart button - allows change from line to bar and vice-versa
    $("#switch-chart").html("<h3 class='nav-right'><button onclick='switchGraph();'>Switch Graph</button></h3>")
    dataArr = [];
    $("#main-info").html("");
    localStorage.setItem("histSelect","");
    //Sort area added to page
    $("#sort-area").html("<div class='col-md-12' id='sorting'><div class='panel-body' id='sorting-area'><div class='col-md-2'><h1 id='sort-h1'>Sort by: </h1></div><div class='col-md-8'><form id='sorting-form'><p><input type='radio' id='s-total' name='sort-radio' value='Total Spent'> Total Spent <input type='radio' id='s-card-w' name='sort-radio' value='Card Withdrawals'> Card Withdrawals <input type='radio' id='s-card-d' name='sort-radio' value='Card Deposits'> Card Deposits <input type='radio' id='s-cash-w' name='sort-radio' value='Cash Spent'> Cash Spent <input type='radio' id='s-cash-d' name='sort-radio' value='Cash Added'> Cash Added </p><p>- OR - Spent on: <input type='radio' id='s-food' name='sort-radio' value='Food'> Food <input type='radio' id='s-ent' name='sort-radio' value='Entertainment'> Entertainment <input type='radio' id='s-bills' name='sort-radio' value='Bills'> Bills <input type='radio' id='s-gas' name='sort-radio' value='Gas'> Gas <input type='radio' id='s-other' name='sort-radio' value='Other'> Other </form></div><div class='col-md-2'><h1 id='sort-h1'><button id='sort-btn'>Go!</button></h1></div></div></div><script>$('#sort-btn').click(function(){    label = $('input[name=sort-radio]:checked').val(); localStorage.setItem('label',label); console.log('label change: '+label);    $('#chart-data').click();});</script>");
}); ////END Chart button click

$("#chart-data").click(function(){ //START CHART DATA
    yAxisData = [];
    dataArr = [];

//Set up x-axis data
xAxisData = [];
for(i = 31; i > 0; i--){
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    //All last 30 days in "Jul 10" format
    var day = new Date(new Date().setDate(new Date().getDate() - (i-1)));
    var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate();
    xAxisData.push(dayFormat);
}//Set up x-axis data STOP

$.get("/data", function(data){ //GET START
    
        //Size of transaction database
        var size = Object.keys(data).length;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var count = 0;
        var addAmount = 0;
        //1st for loop for y axis data (loops through last 30 days)
        for(i = 31; i > 0; i--){
            count = 0;
            addAmount = 0;
            var day = new Date(new Date().setDate(new Date().getDate() - (i-1)));
            var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate() + ' ' + (day.getYear()+ 1900);
            //2nd for loop for data (loops through transaction database)
            for(k = 0; k < size; k++){
                //If Total Spent is selected
                if(localStorage.getItem("label") == "Total Spent"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash"))){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                //If Card Withdrawals is selected
                if(localStorage.getItem("label") == "Card Withdrawals"){                    
                    if((dayFormat==data[k].date) && (data[k].cardOrCash == "Card Withdrawal")){
                        addAmount += data[k].amount;                      
                        count = 1;
                    }
                }
                //If Card Deposits is selected
                if(localStorage.getItem("label") == "Card Deposits"){                    
                    if((dayFormat==data[k].date) && (data[k].cardOrCash == "Card Deposit")){
                        addAmount += data[k].amount;                       
                        count = 1;
                    }
                }
                //If Cash Spent is selected
                if(localStorage.getItem("label") == "Cash Spent"){                    
                    if((dayFormat==data[k].date) && (data[k].cardOrCash == "Subtract Cash")){
                        addAmount += data[k].amount;                     
                        count = 1;
                    }
                }
                //If Cash Added is selected
                if(localStorage.getItem("label") == "Cash Added"){                    
                    if((dayFormat==data[k].date) && (data[k].cardOrCash == "Add Cash")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                // If Food is selected
                if(localStorage.getItem("label") == "Food"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash")) && (data[k].category == "Food")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                // If Entertainment is selected
                if(localStorage.getItem("label") == "Entertainment"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash")) && (data[k].category == "Entertainment")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                // If Bills is selected
                if(localStorage.getItem("label") == "Bills"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash")) && (data[k].category == "Bills")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                // If Gas is selected
                if(localStorage.getItem("label") == "Gas"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash")) && (data[k].category == "Gas")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
                // If Other is selected
                if(localStorage.getItem("label") == "Other"){                    
                    if((dayFormat==data[k].date) && ((data[k].cardOrCash == "Card Withdrawal") || (data[k].cardOrCash == "Subtract Cash")) && (data[k].category == "Other")){
                        addAmount += data[k].amount;                        
                        count = 1;
                    }
                }
            };//END 2nd for loop
            if(count == 1){
                    dataArr.push(addAmount);
                }
            if (count == 0) {
                dataArr.push(0);
            }
        };//END 1st for loop
        
        for(i = 0; i < dataArr.length; i ++){
            yAxisData.push(dataArr[i]);
            if(i == (dataArr.length-1)){
                $("#chart-start").click();
            }
        }
    }); //GET STOP
});//END CHART-DATA

});//DOC READY STOP

function switchGraph(){ // Changes line graph to bar and vice-versa
    graphCount++;
    $("#sort-btn").click();
};