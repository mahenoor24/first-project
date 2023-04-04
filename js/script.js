var a;
function show_modal_forgot(){
	document.getElementById("modal_forgot").style.display="block";
	document.getElementById("modal_login").style.display="none";
	return a=0;
}

var b;
function show_modal_login(){
	document.getElementById("modal_login").style.display="block";
	document.getElementById("modal_forgot").style.display="none";
	return b=0;
}

var c;
function mentor_modal_forgot(){
	document.getElementById("mentor_modal_forgot").style.display="block";
	document.getElementById("mentor_modal_login").style.display="none";
	return c=0;
}

var d;
function mentor_modal_login(){
	document.getElementById("mentor_modal_login").style.display="block";
	document.getElementById("mentor_modal_forgot").style.display="none";
	return d=0;
}

$(document).ready(function(){
	$("body").on("click",".js_signin_btn", function(e) {
		e.preventDefault();
		$(".js-login-error").html('');
		var formData = new FormData($("form#jsSignInForm")[0]);
		$('.js_signin_btn').html($('#loadingImg').html());
		$('.js_signin_btn').attr('disabled', true);
		$.ajax({
			url : $("#jsSignInForm").attr("action"),
			data :formData,
			cache: false,
			contentType: false,
			processData: false,
			type : 'POST',
			dataType : 'json',
			beforeSend  : function (xHR, settings) {
				$("#js_ajax_loader").show();
			},
			error       : function (error) {
				$("#js_ajax_loader").hide();
				$('.js_signin_btn').html('Log In');
				$('.js_signin_btn').attr('disabled', false);
			},
			complete    : function () {
				$("#js_ajax_loader").hide();
				// $t.prop('disabled', false);
			},
			success     : function (response) {

				if (response.success) {
					$( '#jsSignInForm' ).each(function(){
						this.reset();
					});
					if(response.redirect != ""){
						window.location = response.redirect;
					}
					
				} else{
					$('.js-login-error').html(response.error);
					// Swal.fire('Oops...',response.error.email,'error');
				}
				$('.js_signin_btn').html('Log In');
				$('.js_signin_btn').attr('disabled', false);
			}
		});
	});

	$("body").on("click",".js_forgot_password_btn", function(e) {
		e.preventDefault();
		$(".js-login-error").html('');
		var formData = new FormData($("form#jsForgotPasswordForm")[0]);
		$('.js_forgot_password_btn').html($('#loadingImg').html());
		$('.js_forgot_password_btn').attr('disabled', true);
		$.ajax({
			url : $("#jsForgotPasswordForm").attr("action"),
			data :formData,
			cache: false,
			contentType: false,
			processData: false,
			type : 'POST',
			dataType : 'json',
			beforeSend  : function (xHR, settings) {
				$("#js_ajax_loader").show();
			},
			error       : function (error) {
				$("#js_ajax_loader").hide();
				$('.js_forgot_password_btn').html('Submit');
				$('.js_forgot_password_btn').attr('disabled', false);
			},
			complete    : function () {
				$("#js_ajax_loader").hide();
				// $t.prop('disabled', false);
			},
			success     : function (response) {

				if (response.success) {
					$( '#jsForgotPasswordForm' ).each(function(){
						this.reset();
					});
					Swal.fire('Success',response.success,'success').then((res) => {
						if(response.redirect != ""){
							window.location = response.redirect;
						}
					});
					
				} else{
					$('.js-forgot-password-error').html(response.error);
					// Swal.fire('Oops...',response.error.email,'error');
				}
				$('.js_forgot_password_btn').html('Submit');
				$('.js_forgot_password_btn').attr('disabled', false);
			}
		});
	});

	$("body").on("click",".js_forgot_password_mentor", function(e) {
		e.preventDefault();
		$(".js-login-error").html('');
		var formData = new FormData($("form#jsForgotPasswordMentor")[0]);
		$('.js_forgot_password_mentor').html($('#loadingImg').html());
		$('.js_forgot_password_mentor').attr('disabled', true);
		$.ajax({
			url : $("#jsForgotPasswordMentor").attr("action"),
			data :formData,
			cache: false,
			contentType: false,
			processData: false,
			type : 'POST',
			dataType : 'json',
			beforeSend  : function (xHR, settings) {
				$("#js_ajax_loader").show();
			},
			error       : function (error) {
				$("#js_ajax_loader").hide();
				$('.js_forgot_password_mentor').html('Submit');
				$('.js_forgot_password_mentor').attr('disabled', false);
			},
			complete    : function () {
				$("#js_ajax_loader").hide();
				// $t.prop('disabled', false);
			},
			success     : function (response) {

				if (response.success) {
					$( '#jsForgotPasswordForm' ).each(function(){
						this.reset();
					});
					Swal.fire('Success',response.success,'success').then((res) => {
						if(response.redirect != ""){
							window.location = response.redirect;
						}
					});
					
				} else{
					$('.js-forgot-password-error').html(response.error);
					// Swal.fire('Oops...',response.error.email,'error');
				}
				$('.js_forgot_password_mentor').html('Submit');
				$('.js_forgot_password_mentor').attr('disabled', false);
			}
		});
	});
});