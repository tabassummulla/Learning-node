
$(document).ready(function(){


let timer = null;
$('#inputEmail-Reg').keydown(function(){
          clearTimeout(timer); 
          timer = setTimeout(validateEmail, 1000);

});


$('#inputPassword-RegConfirm').keydown(function(){
          clearTimeout(timer); 
          timer = setTimeout(checkPasswordMatch, 1000);

});




});


function checkPasswordMatch(){
 let password = document.getElementById('inputPassword-Reg').value;
let confirmPass = document.getElementById('inputPassword-RegConfirm').value;
let errAlert = document.getElementById('errRegMsg');
let signUpErr = document.getElementById('signUpErr');

if(!(password === "" && confirmPass ==="")) {

if(password !== confirmPass) {
          errAlert.style.visibility = "visible";
          document.getElementById('errRegMsg').className="alert alert-danger";
          document.getElementById('signUpErr').style.color = "red";
          signUpErr.innerHTML = "Passwords do not match!";
}
else{
         
          errAlert.style.visibility = "hidden";
          signUpErr.innerHTML = "";
}


}

}






function validateEmail(){
let email = document.getElementById('inputEmail-Reg').value;
let errAlert = document.getElementById('errRegMsg');
let signUpErr = document.getElementById('signUpErr');
          
let emailFormat = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

document.getElementById('errRegMsg').className="alert alert-danger";
document.getElementById('signUpErr').style.color = "red";

                    if(!(email.match(emailFormat))){
                              

                    errAlert.style.visibility = "visible";
                    signUpErr.innerHTML = "Please enter a valid email address";
                    
                    }
                    else{


                              emailExists(email);
                    }
                    
                    
}


function validateRegForm(){

  
let email = document.getElementById('inputEmail-Reg').value;
let password = document.getElementById('inputPassword-Reg').value;
let confirmPass = document.getElementById('inputPassword-RegConfirm').value;
let firstName = document.getElementById('inputFName-Reg').value;
let lastName = document.getElementById('inputLastName-Reg').value;

let errAlert = document.getElementById('errRegMsg');
let signUpErr = document.getElementById('signUpErr');

let passwordFormat =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;

errAlert.style.visibility = "visible";
signUpErr.innerHTML ="";   
document.getElementById('errRegMsg').className="alert alert-danger";
document.getElementById('signUpErr').style.color = "red";

if(email === "" || password === "" || confirmPass === "" || firstName ==="" || lastName === "" ){

signUpErr.innerHTML = "Please fill in all required fields";

}else if(password !== "") {

if(!(password.match(passwordFormat))){

signUpErr.innerHTML = "Password must contain:" +"\n" +"at least one digit/lowercase/uppercase letter and be at least six characters long";

}

}else if(!(password === "" && confirmPass=== "")){

          if(password === confirmPass) {
          signUpErr.innerHTML = "Passwords do not match!";

          }
          


}

}



function emailExists(email){


let errAlert = document.getElementById('errRegMsg');
let signUpErr = document.getElementById('signUpErr');


let request = new XMLHttpRequest();
let url = '/api/register/exists';
         
request.open('POST', url);
const body = {
          email_add: email,

};
request.setRequestHeader("Content-Type", "application/json");

request.onload= function() {

errAlert.style.visibility = "visible";

if(request.status === 409){

signUpErr.innerHTML = "Email is already registered  "+ "<a href='http://localhost:3000/index.html'> Login Now </a>";

}
else if(request.status === 200){

          document.getElementById('errRegMsg').className="alert alert-success";
          document.getElementById('signUpErr').style.color = "green";
          signUpErr.innerHTML = request.response;
          
          }
};

request.send(JSON.stringify(body));



}