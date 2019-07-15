
function logout() {
    let request = new XMLHttpRequest();
    let url = '/api/logout';
   
    request.open('GET', url);

    // request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {

        if(request.response.status === 200){
            
        window.location.href='http://localhost:3000/login';
        }
              
    };


    request.send();


}

