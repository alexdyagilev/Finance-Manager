$(document).ready(function(){

var dataArr = [];
var yAxisData = [];
var xAxisData = [];

$("#chart-start").click(function(){
// console.log("CHART START FUNCTION");
label = localStorage.getItem("label");
// console.log("CHART START LABEL: "+label);
$("#chart").html("<canvas id='myChart' width='400' height='140'></canvas>");
//Chart Setup
var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
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
});

localStorage.setItem("label","");
// console.log("LABEL RESET!");

}); //END CHART-START

localStorage.setItem("label","");
var label = "";
// console.log("LABEL BACK TO: "+label);

//Chart button click
$("#charts-btn").click(function(){
    console.log("----------------------");
    dataArr = [];
    $("#main-info").html("");
    //Sort area
    $("#sort-area").html("<div class='col-md-12' id='sorting'><div class='panel-body' id='sorting-area'><div class='col-md-2'><h1 id='sort-h1'>Sort by: </h1></div><div class='col-md-8'><form id='sorting-form'><p><input type='radio' id='s-total' name='sort-radio' value='Total Spent'> Total Spent <input type='radio' id='s-card-w' name='sort-radio' value='Card Withdrawals'> Card Withdrawals <input type='radio' id='s-card-d' name='sort-radio' value='Card Deposits'> Card Deposits <input type='radio' id='s-cash-w' name='sort-radio' value='Cash Spent'> Cash Spent <input type='radio' id='s-cash-d' name='sort-radio' value='Cash Added'> Cash Added </p><p>- OR - Spent on: <input type='radio' id='s-food' name='sort-radio' value='Food'> Food <input type='radio' id='s-ent' name='sort-radio' value='Entertainment'> Entertainment <input type='radio' id='s-bills' name='sort-radio' value='Bills'> Bills <input type='radio' id='s-gas' name='sort-radio' value='Gas'> Gas <input type='radio' id='s-other' name='sort-radio' value='Other'> Other </form></div><div class='col-md-2'><h1 id='sort-h1'><button id='sort-btn'>Go!</button></h1></div></div></div><script>$('#sort-btn').click(function(){    label = $('input[name=sort-radio]:checked').val(); localStorage.setItem('label',label); console.log('label change: '+label);    $('#chart-data').click();});</script>");
}); //END CHART-BTN

$("#chart-data").click(function(){
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
};//Set up x-axis data STOP

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
            var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate();
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
            // console.log("ADDED");
            if(i == (dataArr.length-1)){
                // console.log("CLICK CHART START!");
                $("#chart-start").click();
                // console.log("AFTER CLICK");
            }
        }
        // console.log("LABEL: "+label);
        // console.log("LABEL: "+localStorage.getItem("label"));
        console.log("Y AXIS DATA: "+yAxisData);
        console.log("Y AXIS LENGTH: "+yAxisData.length);
        // console.log("---END DATA---")
    }); //GET STOP
});//END CHART-DATA

});//DOC READY STOP