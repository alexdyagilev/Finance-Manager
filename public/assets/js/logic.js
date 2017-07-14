$(document).ready(function(){
	var newLogin = 0;
	localStorage.setItem("new-account",newLogin);
	console.log(newLogin);

	localStorage.setItem("history",0);

	localStorage.setItem("current-bank",0);
	localStorage.setItem("current-cash",0);

function newAccount(){
	var newLogin = 1;
	localStorage.setItem("new-account",newLogin);
	console.log("new: " + newLogin);
	var username = $("#username").val().trim(); 
	localStorage.setItem("username",username);

	$.ajax({
		url: "/newaccount",
		method: "POST",
		data: {
			username: $('#cardOrCash').val(),
			password: $('#description').val(),
			bankAmount: $('#amount-input').val(),
			cashAmount: $('#date-input').val()
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});
}

$.ajax({
		url: "/submit",
		method: "POST",
		data: {
			cardOrCash: $('#cardOrCash').val(),
			description: $('#description').val(),
			amount: $('#amount-input').val(),
			date: $('#date-input').val()
			},
		success: function(){
			// console.log("DATA POSTED!");
			},
		error: function(err){
			return err;
			}
		});

});