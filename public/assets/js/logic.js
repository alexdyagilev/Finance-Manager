//------------------------------------------------------------------------------
//                FINANCIAL MANAGER v1.0
//------------------------------------------------------------------------------
//                  by Alex Dyagilev
//------------------------------------------------------------------------------
//                      logic.js -- sets username and password
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

$(document).ready(function(){
	localStorage.setItem("new-account",1);
});

function storeUN(){
		localStorage.setItem("username",$("#username").val());
		localStorage.setItem("password",$("#password").val());
	}