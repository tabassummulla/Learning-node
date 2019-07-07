



function validateFields(){

    let email = document.getElementById('inputEmail').value;
    let password = document.getElementById('inputPassword').value;
    let errAlert =  document.getElementById('err');
    let emailFormat = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/;

    if(email === "" && password === ""){

        errAlert.innerHTML="Please fill in required fields";

    }else if(password === ""){
        document.getElementById('inputPassword').focus();
        errAlert.innerHTML="Please enter your password to login";
    }
    else if(!(email.match(emailFormat))){

        errAlert.innerHTML="Please enter a valid email address";
       document.getElementById('inputEmail').focus();
       document.getElementById('inputPassword').focus();
    }
    else{
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

                    if (request.status === 200) {
                                        alert(JSON.stringify(request.response));
                              //TODO need to redirect on success of login to different html page 
                              }
                              else if (request.status == 401 || request.status == 404 ) {

                                        alert(JSON.stringify(request.response));

                              }
                    
          };


          request.send(JSON.stringify(body));





}