
function validateFields(){

    document.getElementById('loginErr').innerHTML = "";

    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let errAlert =  document.getElementById('loginErr');
    let emailFormat = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

    if(email === "" && password === ""){

        document.getElementById('errMsg').style.visibility="visible";
        document.getElementById('inputEmail').focus();
        loginErr.innerHTML="Please fill in required fields";

    }else if(password === ""){

        document.getElementById('errMsg').style.visibility="visible";
        document.getElementById('inputPassword').focus();
        errAlert.innerHTML="Please enter your password to login";
    }
    else if(!(email.match(emailFormat))){

        document.getElementById('errMsg').style.visibility="visible";
        errAlert.innerHTML="Please enter a valid email address";
       document.getElementById('inputEmail').focus();
       document.getElementById('inputPassword').focus();
    }
    else{
        errAlert.innerHTML="";
        login(email, password);
    }



}














function login(email,password) {
          let request = new XMLHttpRequest();
          let url = '/api/login';
         
          request.open('POST', url);
          const body = {
                    email_add: email,
                    password: password

          };
          request.setRequestHeader("Content-Type", "application/json");

          request.onload = function () {

         let resp = JSON.parse(request.response);

                document.getElementById('errMsg').style.visibility="visible";
                 document.getElementById('loginErr').innerHTML = resp['message'];

                    if (request.status === 200) {

                        document.getElementById('errMsg').className="alert alert-success";
                        document.getElementById('loginErr').style.color = "green";

                              //TODO: need to redirect on success of login to different html page 

                            document.getElementById('logoutBtn').style.visibility = 'visible';

                              }
                              else if (request.status == 401) {

                                    document.getElementById('inputPassword').focus();

                                    
                              } else if (request.status == 404) {

                                document.getElementById('registerBtn').focus();
                              }
                    
          };


          request.send(JSON.stringify(body));





}




