
function logout() {
    let request = new XMLHttpRequest();
    let url = '/api/logout';
    request.open('GET', url);
    request.send();

    let delayInMilliseconds = 1000; //1 second

    setTimeout(function() {

        window.location.href= '/login';
        
    }, delayInMilliseconds);

}

