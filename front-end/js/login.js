

function login() {

          let email = document.getElementById('inputEmail').value;
          let password = document.getElementById('inputPassword').value;

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
                              else if (request.status == 401) {

                                        alert(JSON.stringify(request.response));

                              }
                    
          };


          request.send(JSON.stringify(body));





}