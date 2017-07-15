// ------------------------------------------------------------------------------
//                FINANCIAL MANAGER v1.0
// ------------------------------------------------------------------------------
//                  by Alex Dyagilev
// ------------------------------------------------------------------------------
//                      main.js -- most of JS for app
// ------------------------------------------------------------------------------
// ------------------------------------------------------------------------------

$(document).ready(function(){
	$("#current-user").html("" + localStorage.getItem("username")); //Username in top left
	$("#new-tr-btn").click(function(){ //START New Transaction
		$('#main-info').html("");
		$("#chart").html("");
		$("#sort-area").html("");
		localStorage.setItem("histSelect","");
		$("#main-info").html("<br><div class='panel panel-default'>			<div class='panel-heading'><h1 id='new-tr-title'><strong>Add New Transaction</strong></h1></div><div class='panel-body'><h3>Type of Transaction:</h3><form><p><input type='radio' id='card-d' name='new-tr-1' value='cardD'> Card Deposit <input type='radio' id='card-w' name='new-tr-1' value='cardW'> Card Withdrawal <br><br><input type='radio' id='cash-d' name='new-tr-1' value='cashD'> Add Cash <input type='radio' id='cash-w' name='new-tr-1' value='cashW'> Subtract Cash </p></form><h3><button onclick='trNext();' id='tr-btn-1'>Next</button></h3>");
	}); //END New Transaction

var events = { //Starts the events JSON for Calendar
	"monthly": [
    {
      "id": 0,
      "name": "",
      "startdate": "2017-01-01",
      "color": "#FFB128"
    }
    ]
};

var cardWColor = "#2dc7ff"; //Sets color for card withdrawal
var cardDColor = "#2d7eff"; //Sets color for card deposit
var cashWColor = "#4cc956"; //Sets color for cash withdrawal
var cashDColor = "#0e8210"; //Sets color for cash deposit
color = ""; //Calendar event color

	$("#calendar-btn").click(function(){ //START Calendar Button onclick
		$("#chart").html("");
		$("#sort-area").html("");
		$('#main-info').html("");
		localStorage.setItem("histSelect",""); //RESETS History selector
		$.get("/data", function(data){ //START Calendar GET DATA
			var element = {};
			var size = Object.keys(data).length;
			var newDate = "";
			var newDateArr = [];
			var months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
			var date = "";
			var label = "";
			var count = 1;
			for(i = 0; i < size; i++){ //BEGIN Calendar loop
				var same = false;
				newDate = data[i].date;
				newDateArr = newDate.split(' ');
				for(k = 0; k < months.length; k++){ //BEGIN MONTHS LOOP
					if((newDateArr[0] == months[k]) && (k < 10)){
						newDateArr[0] = "0" + k;
					}
					else if((newDateArr[0] == months[k])){
						newDateArr[0] = "" + k;
					}
				} //END MONTHS LOOP
				for(j = 1; j < 10; j++){ //BEGIN Days loop
					if(newDateArr[1] == j){
						newDateArr[1] == '0' + newDateArr[1];
					}
				} //END Days loop
				if(data[i].cardOrCash == "Card Withdrawal"){
					label = "Card--";
					color = cardWColor;
				}
				else if(data[i].cardOrCash == "Card Deposit") {
					label = "Card++";
					color = cardDColor;
				}
				else if(data[i].cardOrCash == "Subtract Cash") {
					label = "Cash--";
					color = cashWColor;
				}
				else if(data[i].cardOrCash == "Add Cash") {
					label = "Cash++";
					color = cashDColor;
				}
				label += " " + data[i].description;
				date = newDateArr[2] + '-' + newDateArr[0] + '-' + newDateArr[1];
				element = {"id":i+1, "name":label, "startdate":date, "color":color};
				events.monthly.push(element);
			} //END Calendar loop
			Calendar();
		}); //END Calendar GET DATA
		events = { //RESETS events after Calendar is displayed (to prevent doubling data)
			"monthly": [
    			{
      				"id": 0,
			        "name": "",
      				"startdate": "2017-01-01",
      				"color": "#FFB128"
    			}
    					]
		};
	}); //END Calendar Button onclick

	function Calendar(){ //Draws the Calendar on page
		$('#main-info').monthly({
    			mode: 'event',
    			dataType: 'json',
    			events: events
		});
	};

localStorage.setItem("histSelect",""); //RESETS History selector

	$("#history-btn").click(function(){ //START History button
		console.log("HS: "+localStorage.getItem("histSelect"));
		$("#chart").html("");
		$("#sort-area").html("");
		var all = "";
		$.get("/data", function(data){ //GET START
			var size = Object.keys(data).length;
			var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            var count = 0;
            var appended = "";
            var addAmount = "";
           if(localStorage.getItem("histSelect") == "last30"){ //START IF 30 days selected
			for(i = 0; i < 31; i++){ //START last 30 days loop
				addAmount = "";
            	count = 0;
            	var day = new Date(new Date().setDate(new Date().getDate() - (i)));
            	var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate() + ' ' + (day.getYear()+ 1900);
            	for(k = 0; k < size; k++){ //START History get loop
            		if(dayFormat == data[k].date){
            			if(count == 0){
            				addAmount += "<u><p class='history-date'>" + dayFormat + " </p></u>";
            				count++;
            			}
            			addAmount += "<p>" + data[k].cardOrCash + ": " + "$" + data[k].amount + " - " + data[k].description + "</p>"
            		}
				} //END History get loop
				appended += addAmount;
				all = "<div class='panel-body'><h4><u>Last 30 Days</u></h4>" + appended + "</div></div></div>";
            } //END last 30 days loop
        } //END IF 30 days selected
        if(localStorage.getItem("histSelect") == "thisyearsofar"){ //START IF This Year selected
        	var thisyeardays = new Date().getFullYear();
        	var year = new Date().getFullYear();
        	var month = new Date().getMonth();
        	var day = new Date().getDate();
        	thisyeardays = days_passed(new Date(year,month,day));
        	console.log("FY: "+thisyeardays);
			for(i = 0; i < thisyeardays; i++){ //START this year loop
				addAmount = "";
            	count = 0;
            	var day = new Date(new Date().setDate(new Date().getDate() - (i)));
            	var dayFormat = monthNames[(day.getMonth())] + ' ' + day.getDate() + ' ' + (day.getYear()+ 1900);
            	for(k = 0; k < size; k++){ //START History get loop
            		if(dayFormat == data[k].date){
            			if(count == 0){
            				addAmount += "<u><p class='history-date'>" + dayFormat + " </p></u>";
            				count++;
            			}
            			addAmount += "<p>" + data[k].cardOrCash + ": " + "$" + data[k].amount + " - " + data[k].description + "</p>"
            		}
				} //END History get loop
				appended += addAmount;
				all = "<div class='panel-body'><h4><u>This Year So Far</u></h4>" + appended + "</div></div></div>";
            } //END this year loop
        } //END IF This Year selected
			$('#main-info').html("<div='container'><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Transaction History</strong></h1></div><div class='panel-heading' id='hist-2'><div class='row'><div class='col-md-2'><h4><strong>Show: </strong></h4></div><div class='col-md-8'><input type='radio' id='last30' name='show-radio' value='last30'><strong> Last 30 Days <input type='radio' id='thisyearsofar' name='show-radio' value='thisyearsofar'> This Year So Far </strong></div><div class='col-md-2'><button onclick='historyGo();'><h4>Go!</h4></button></div></div></div>" + all);
		}); //GET END
	}); //END History button
}); //END DOC READY

function days_passed(dt) { //Returns the current # day of the year
  var current = new Date(dt.getTime());
  var previous = new Date(dt.getFullYear(), 0, 1);
  return Math.ceil((current - previous + 1) / 86400000);
}

function historyGo(){ //Uses History Selection to draw History on page
		localStorage.setItem("histSelect",$('input[name=show-radio]:checked').val());
		$("#main-info").html("");
		$("#history-btn").click();
	};

function trNext(){ //Called after clicking NEXT for New Transaction
		var trStepOne = $('input[name=new-tr-1]:checked').val();
		localStorage.setItem("trStepOne",trStepOne);
		switch(trStepOne) {
			case "cardD":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Card Deposit</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Card Deposit'><p>Description: <input type='text' id='description'></p><p class='cardD-text'>Amount: $ <input type='text' id='amount-input'></p><p class='cardD-date'>Date (e.g. Jul 14 2017): $ <input type='text' id='date-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cardW":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Card Withdrawal</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Card Withdrawal'><h3>Description: <input type='text' id='description'></h3><p class='cardW-text'>Amount: $ <input type='text' id='amount-input'></p><p class='cardW-date'>Date (e.g. Jul 14 2017): $ <input type='text' id='date-input'></p><p>Category: <select id='category'>	<option value=''></option><option value='Food'>Food</option><option value='Entertainment'>Entertainment</option><option value='Bills'>Bills</option><option value='Gas'>Gas</option><option value='Other'>Other</option></select></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cashD":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Add Cash</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Add Cash'><h3>Description: <input type='text' id='description'></h3><p class='cashD-text'>Amount: $ <input type='text' id='amount-input'></p><p class='cashD-date'>Date (e.g. Jul 14 2017): $ <input type='text' id='date-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cashW":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Subtract Cash</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Subtract Cash'><h3>Description: <input type='text' id='description'></h3><p class='cashW-text'>Amount: $ <input type='text' id='amount-input'></p><p class='cashW-date'>Date (e.g. Jul 14 2017): $ <input type='text' id='date-input'></p><p>Category: <select id='category'>	<option value=''></option><option value='Food'>Food</option><option value='Entertainment'>Entertainment</option><option value='Bills'>Bills</option><option value='Gas'>Gas</option><option value='Other'>Other</option></select></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
		} 
}; //END function trNext


function trFinish(){ //Called after clicking FINISH for New Transaction
	var cat = $("#category :selected").text();
	//IF Deposit is made --> no category added to DB -AND- Date specified 
	if(($('#cardOrCash').val() == "Card Deposit") || ($('#cardOrCash').val() == "Add Cash")){
		if($('#date-input').val() != ""){
		$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val(),
			date: $('#date-input').val(),
			category: cat
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});
	}
	else{ //IF Deposit is made --> no category added to DB -AND- Date NOT specified 
		$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val(),
			category: cat
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});
	}
	} //END Deposit POSTs
	else {
		//IF Withdrawal is made --> no category added to DB -AND- Date specified 
		if($('#date-input').val() != ""){
		$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val(),
			date: $('#date-input').val(),
			category: cat
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});
	}
	else{
		//IF Withdrawal is made --> no category added to DB -AND- Date NOT specified 
		$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val(),
			category: cat
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});
	}
	} //END Withdrawal POSTs

	var trStepOne = localStorage.getItem("trStepOne"); //What kind of transaction selected
	console.log(trStepOne);
	switch(trStepOne){ //START SWITCH
		case "cardD": //Card Deposit
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Added to Bank Balance:  $" + value + "</h3>");
			break;
		case "cardW": //Card Withdrawal
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Subtracted from Bank Balance:  $" + value + "</h3>");
			break;
		case "cashD": //Cash Deposit
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Cash Added:  $" + value + "</h3>");
			break;
		case "cashW": //Cash Withdrawal
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Cash Subtracted:  $" + value + "</h3>");
			break;
	} //END SWITCH
}; //END function trFinish