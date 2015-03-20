// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function login(username, password){
	$.ajax({
		url	: 'login'
		,type	: 'POST'
		,data	: JSON.stringify({
			username: username,
			password: password,
		})
		,contentType	: 'application/json; charset=utf-8'
		,dataType	: 'json'
		,success	: function(data){
			if (data.error_code == -4)
				$('#message').html('Invalid username and password combination. Please try again.')
			else{
				console.log('login');
				window.location.href='/'
			}
		}
		,error	: function(result){
			console.log('에러')
		}
	})
}
function signup(username, password){
	$.ajax({
		url	: 'signup'
		,type	: 'POST'
		,data	: JSON.stringify({
			username: username,
			password: password,
		})
		,contentType	: 'application/json; charset=utf-8'
		,dataType	: 'json'
		,success	: function(data){
			if (data.error_code == -1)
				$('#message').html('The user name should be 5~20 characters long. Please try again.')
			else
			if (data.error_code == -2)
				$('#message').html('The password should be 8~20 characters long. Please try again.')
			else
			if (data.error_code == -3)
				$('#message').html('This user name already exists. Please try again.')
			else{
				console.log('login');
				window.location.href='/'
			}
		}
		,error	: function(result){
			console.log('에러')
		}
	})
}
$('#loginButton').click(function(){login($('#usernameInput').val(), $('#passwordInput').val());});
$('#signupButton').click(function(){signup($('#usernameInput').val(), $('#passwordInput').val())});
$('#logoutButton').click(function(){window.location.href="/logout"});
