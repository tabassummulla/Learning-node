
function logout() {
    let request = new XMLHttpRequest();
    let url = '/api/logout';
   
    request.open('GET', url);

    // request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {

        console.log(request.response);
              
    };


    request.send();


}

