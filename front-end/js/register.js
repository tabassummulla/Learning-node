

$(document).ready(function () {

  var timer = null;


  $('#inputEmail-Reg').keydown(function () {
    clearTimeout(timer);
    timer = setTimeout(validateEmail, 1000);

  });


  document.addEventListener('keyup', (event) => {

    if(event.keyCode == 8) {
      
      let errAlert = document.getElementById('errRegMsg');
      let signUpErr = document.getElementById('signUpErr');

      errAlert.visibility ="hidden";
      signUpErr.innerHTML = "";
    }

  });

  $('#inputPassword-RegConfirm').keydown(function () {
    clearTimeout(timer);
    timer = setTimeout(checkPasswordMatch, 1000);

  });

});


function checkPasswordMatch() {
  let password = document.getElementById('inputPassword-Reg');
  let confirmPass = document.getElementById('inputPassword-RegConfirm');
  let errAlert = document.getElementById('errRegMsg');
  let signUpErr = document.getElementById('signUpErr');

  if (password.value !== confirmPass.value) {

    errAlert.style.visibility = "visible";
    errAlert.className = "alert alert-danger";
    signUpErr.style.color = "red";

    password.focus();
    confirmPass.focus();
    signUpErr.innerHTML = "Passwords do not match!";
  }
  else {
    errAlert.style.visibility = "hidden";
    signUpErr.innerHTML = "";
  }

}






function validateEmail() {
  let email = document.getElementById('inputEmail-Reg');
  let errAlert = document.getElementById('errRegMsg');
  let signUpErr = document.getElementById('signUpErr');

  let emailFormat = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

  errAlert.className = "alert alert-danger";
  signUpErr.style.color = "red";

  if(email.value !== ""){

  if (!(email.value.match(emailFormat))) {

    errAlert.style.visibility = "visible";
    signUpErr.innerHTML = "Please enter a valid email address";
    email.focus();

  }
  else {
    emailExists(email.value);

  }
}else{
  errAlert.style.visibility = "hidden";

}
}


function validateRegForm() {

  let email = document.getElementById('inputEmail-Reg');
  let password = document.getElementById('inputPassword-Reg');
  let confirmPass = document.getElementById('inputPassword-RegConfirm');
  let firstName = document.getElementById('inputFName-Reg');
  let lastName = document.getElementById('inputLastName-Reg');
  let passwordFormat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

  //Alert message 
  let errAlert = document.getElementById('errRegMsg');
  let signUpErr = document.getElementById('signUpErr');

  signUpErr.innerHTML = "";
  errAlert.className = "alert alert-danger";
  signUpErr.style.color = "red";

  if (email.value === "" || password.value === "" || confirmPass.value === "" || firstName.value === "" || lastName.value === "") {

    errAlert.style.visibility = "visible";
    signUpErr.innerHTML = "Please fill in all required (*) fields";
    return false;
  }
  if (password.value !== confirmPass.value) {

    errAlert.style.visibility = "visible";
    signUpErr.innerHTML = "Passwords do not match!";
    return false;

  } else if (!(password.value.match(passwordFormat))) {
    errAlert.style.visibility = "visible";
    signUpErr.innerHTML = "Password must contain:" + "\n" + "at least one digit/lowercase/uppercase letter and be at least six characters long";
    return false;
  }

  signUp(email.value, firstName.value, lastName.value, password.value);


}








function emailExists(email) {

  let errAlert = document.getElementById('errRegMsg');
  let signUpErr = document.getElementById('signUpErr');
  let request = new XMLHttpRequest();
  let url = '/api/register/exists';

  request.open('POST', url);
  const body = {
    email_add: email,

  };
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {

    errAlert.style.visibility = "visible";

    let resp = JSON.parse(request.response);
    if (request.status === 409) {

      signUpErr.innerHTML = "Email is already registered  " + "<a href='http://localhost:3000/login'> Login Now </a>";

    }
    else if (request.status === 200) {

      errAlert.className = "alert alert-success";
      signUpErr.style.color = "green";
      signUpErr.innerHTML = resp['message'];
    }


  };

  request.send(JSON.stringify(body));

}


function signUp(email, firstName, lastName, password) {

  let errAlert = document.getElementById('errRegMsg');
  let signUpErr = document.getElementById('signUpErr');

  let request = new XMLHttpRequest();
  let url = "/api/register";

  request.open('POST', url);

  const body = {
    email_add: email,
    first_name: firstName,
    last_name: lastName,
    password: password

  };
  request.setRequestHeader("Content-Type", "application/json");

  request.onload = function () {

    errAlert.style.visibility = "visible";

    let resp = JSON.parse(request.response);
    signUpErr.innerHTML = resp['message'];

    if (request.status === 200) {

      errAlert.className = "alert alert-success";
      signUpErr.style.color = "green";
      


    }
    
  };

  request.send(JSON.stringify(body));



}