$(document).ready(function(){
	localStorage.setItem("new-account",1);

	

});

function storeUN(){
		localStorage.setItem("username",$("#username").val());
		localStorage.setItem("password",$("#password").val());
	}