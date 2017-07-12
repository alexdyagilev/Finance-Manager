
$(document).ready(function(){



	document.getElementById("current-user").innerHTML = localStorage.getItem("username");

    if (localStorage.getItem("new-account") == 1 && localStorage.getItem("current-bank") == 0){
		$("#main-info").html("<h1>Welcome to Finance Manager! To start, please set your bank and cash totals.</h1><h2 class='main-prompt'>Bank Total: </h2><h2><input type='text' id='new-bank'></h2><br><h2 class='main-prompt'>Cash Total: </h2><h2><input type='text' id='new-cash'></h2><h2 class='main-prompt' id='submit-main'><button>Submit</button></h2>");
	}
	else if(localStorage.getItem("history")==0){
		$("#main-info").html("<h1>Your bank and cash values have been set. Use the links above to navigate and use the features.</h1>");
	}

	$("#bank-total").html("<h3>Current Bank Total: $" + localStorage.getItem("current-bank") + "</h3>");
	$("#cash-total").html("<h3> Current Cash Total: $" + localStorage.getItem("current-cash") + "</h3>");

	$("#submit-main").click(function(){
	var currentBank = $("#new-bank").val().trim();
	var currentCash = $("#new-cash").val().trim();
	localStorage.setItem("current-bank", currentBank);
	localStorage.setItem("current-cash", currentCash);
	$('#bank-total').load('./main.html', function() {});
	$('#cash-total').load('./main.html', function() {});
	// $("#bank-total", window.parent.document).load("./main.html", function(){});
	// $("#cash-total", window.parent.document).load("./main.html", function(){});
	// location.reload();

	$("#main-info").html("<h1>Your bank and cash values have been set. Use the links above to navigate and use the features.</h1>");
	});

	$("#new-tr-btn").click(function(){
		$('#main-info').html("");
		$("#chart").html("");
		$("#sort-area").html("");
		$("#main-info").html("<br><div class='panel panel-default'>			<div class='panel-heading'><h1 id='new-tr-title'><strong>Add New Transaction</strong></h1></div><div class='panel-body'><h3>Type of Transaction:</h3><form><p><input type='radio' id='card-d' name='new-tr-1' value='cardD'> Card Deposit <input type='radio' id='card-w' name='new-tr-1' value='cardW'> Card Withdrawal <br><br><input type='radio' id='cash-d' name='new-tr-1' value='cashD'> Add Cash <input type='radio' id='cash-w' name='new-tr-1' value='cashW'> Subtract Cash </p></form><h3><button onclick='trNext();' id='tr-btn-1'>Next</button></h3>");
	});


	$("#calendar-btn").click(function(){
		$("#chart").html("");
		$("#sort-area").html("");
		localStorage.setItem("history-click",1);
		$('#main-info').html("");
        $('#main-info').monthly();
	});

	$("#history-btn").click(function(){
		$("#chart").html("");
		$("#sort-area").html("");
		localStorage.setItem("history",1)
		location.reload();
		// $('#main-info').html("<div='container'>       <div class='panel panel-default'>          <div class='panel-heading'><h1 id='new-tr-title'><strong>            Transaction History</strong></h1>          </div>          <div class='panel-body'>            <p>History goes here</p>          </div>        </div>      </div>");
	});
});

function trNext(){
	
		var trStepOne = $('input[name=new-tr-1]:checked').val();
		localStorage.setItem("trStepOne",trStepOne);
		switch(trStepOne) {
			case "cardD":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Card Deposit</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Card Deposit'><h3>Description: <input type='text' id='description'></h3><p class='cardD-text'>Amount: $ <input type='text' id='amount-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cardW":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Card Withdrawal</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Card Withdrawal'><h3>Description: <input type='text' id='description'></h3><p class='cardW-text'>Amount: $ <input type='text' id='amount-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cashD":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Add Cash</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Add Cash'><h3>Description: <input type='text' id='description'></h3><p class='cashD-text'>Amount: $ <input type='text' id='amount-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
			case "cashW":
				$("#main-info").html("<div><br><div class='panel panel-default'><div class='panel-heading'><h1 id='new-tr-title'><strong>Subtract Cash</strong></h1></div><div class='panel-body'><input type='text' id='cardOrCash' hidden value='Subtract Cash'><h3>Description: <input type='text' id='description'></h3><p class='cashW-text'>Amount: $ <input type='text' id='amount-input'></p><h3><button id='tr-btn-2' onclick='trFinish();'>Finish</button></h3></div>");
				break;
		} 

};


function trFinish(){
	$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val()
			},
		success: function(){
			console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});

	var trStepOne = localStorage.getItem("trStepOne");
	console.log("trFinish!");
	console.log(trStepOne);
	switch(trStepOne){
		case "cardD":
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Added to Bank Balance:  $" + value + "</h3>");
			break;
		case "cardW":
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Subtracted from Bank Balance:  $" + value + "</h3>");
			break;
		case "cashD":
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Cash Added:  $" + value + "</h3>");
			break;
		case "cashW":
			var value = $('#amount-input').val();
			$("#main-info").html("<br><div class='panel panel-default'><div class='panel-body'><h3>Cash Subtracted:  $" + value + "</h3>");
			break;
	}


};


// <h3>Spent on:</h3><p><input type='radio' id='bills-radio' name='tr-category'> Bills <input type='radio' id='food-radio' name='tr-category'> Food <input type='radio' id='ent-radio' name='tr-category'> Entertainment <input type='radio' id='other-radio' name='tr-category'> Other</p></div></div>