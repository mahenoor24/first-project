var a;
function show_modal_forgot(){
	$("#modal_login").modal("hide");
	$("#modal_forgot").modal("show");
	// document.getElementById("modal_forgot").style.display="block";
	// document.getElementById("modal_login").style.display="none";
	// return a=0;
}

var b;
function show_modal_login(){
	$("#modal_forgot").modal("hide");
	$("#modal_login").modal("show");
	return b=0;
}

var c;
function mentor_modal_forgot(){
	$("#mentor_modal_login").modal("hide");
	$("#mentor_modal_forgot").modal("show");
	// document.getElementById("mentor_modal_forgot").style.display="block";
	// document.getElementById("mentor_modal_login").style.display="none";
	return c=0;
}

var d;
function mentor_modal_login(){
	$("#mentor_modal_forgot").modal("hide");
	$("#mentor_modal_login").modal("show");
	// document.getElementById("mentor_modal_login").style.display="block";
	// document.getElementById("mentor_modal_forgot").style.display="none";
	return d=0;
}

$(document).ready(function(){
	$("#student_login").click(function(e){
		e.preventDefault();
		$(".js-login-error").html('');
		if($("#js_agree_check").length > 0 && $("#js_agree_check").is(":checked") == false){
			$(".js-login-error").html('Please agree to terms & conditions by clicking the checkbox.');
			return false;
		}
		$("#js_ajax_loader").show();
		$('#student_login').html($('#loadingImg').html());
		$('#student_login').attr('disabled', true);
		$.ajax({
			type:"POST",
			url:$("#student_process").val(),
			data:{
			"username": $("#student_usn").val(),
			"password": $("#student_pwd").val()
			},
			complete: function(){
				$('#student_login').html('Log In');
				$('#student_login').attr('disabled', false);
			},
			success: function(response){
				// console.log(response);
				// return;
				if(response.code==200){
					// localStorage.setItem("token", response.data.access_token);
					// window.location.href=response.data.redirect_url+'?token='+response.data.access_token+'&name='+response.data.username+'&image='+response.data.profile_pic_link+'&firstLogin='+response.data.first_login;
					var send_data = {'token':response.data.access_token,
									'redirect_url':response.data.redirect_url,
									'name':response.data.username,
									'firstLogin': response.data.first_login,
									// 'user_id': response.data.token.user_id
								};
					var first_response = response;
					$.ajax({
						type:"POST",
						url:JS_baseurl+'/general/user-login-data/student',
						data:send_data,
						dataType : 'json',
						complete    : function () {
							$("#js_ajax_loader").hide();
						},
						success: function(response){
							// console.log(response);
							// return;
							window.location.href=first_response.data.redirect_url+'?token='+first_response.data.access_token+'&name='+first_response.data.username+'&firstLogin='+first_response.data.first_login;
						},
						error:function(err){
							$("#js_ajax_loader").hide();
						}
					})
				}
			},
			error:function(err){
				// console.log(err)
				$("#username_err").html(err.responseJSON.data.username_err??'');
				$("#password_err").html(err.responseJSON.data.password_err??'');
			}
		})
	});

	$("#mentor_login").click(function(e){
		e.preventDefault();
		$('#mentor_login').html($('#loadingImg').html());
		$('#mentor_login').attr('disabled', true);
		$.ajax({
			type:"POST",
			url:$("#mentor_process").val(),
			data:{
			"username": $("#mentor_usn").val(),
			"password": $("#mentor_pwd").val()
			},
			complete: function(){
				$('#mentor_login').html('Log In');
				$('#mentor_login').attr('disabled', false);
			},
			success: function(response){
				// console.log(response);
				// return false;
				if(response.code==200){
					/*localStorage.setItem("token", response.data.access_token);
					window.location.href=response.data.redirect_url+'?token='+response.data.access_token+'&name='+response.data.username+'&image='+response.data.profile_pic_link+'&firstLogin='+response.data.first_login;*/

					var send_data = {'token':response.data.access_token,
									'redirect_url':response.data.redirect_url,
									'name':response.data.username,
									// 'image':response.data.profile_pic_link,
									// 'user_id': response.data.token.user_id
								};
					var first_response = response;
					$.ajax({
						type:"POST",
						url:JS_baseurl+'/general/user-login-data/mentor',
						data:send_data,
						dataType : 'json',
						complete : function () {
							$("#js_ajax_loader").hide();
						},
						success: function(response){
							// console.log(response);
							window.location.href=first_response.data.redirect_url+'?token='+first_response.data.access_token+'&name='+first_response.data.username;
						},
						error:function(err){
							$("#js_ajax_loader").hide();
						}
					})
				}else if(response.code==401){

				}
			},
			error:function(err){
				console.log(err)
				$("#mentor_username_err").html(err.responseJSON.data.username_err??'');
				$("#mentor_password_err").html(err.responseJSON.data.password_err??'');
			}
		})
	});

	$("#student_usn,#student_pwd,#mentor_usn,#mentor_pwd").keypress(function(e){
		console.log(e);
		console.log($(this).attr('id'));
		if(e.which == 13) {
			my_id = $(this).attr('id');
			if(my_id == 'student_usn' || my_id == 'student_pwd'){
				$("#student_login").trigger("click");
			}else{
				$("#mentor_login").trigger("click");
			}
		}
	});




});