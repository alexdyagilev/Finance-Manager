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
}



