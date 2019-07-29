
    $(document).ready(function(){

        getUserProfile();

    });






function getUserProfile(){

        let request = new XMLHttpRequest();
        let url = '/api/profile';
       
        request.open('GET', url);

        request.onload = function () {
    
            if(request.status === 200) {

              let resp = JSON.parse(request.response);

              document.getElementById('logoutBtn').style.visibility = 'visible';
              document.getElementById('welcomeMsg').innerHTML = 'Welcome Back ' + resp['first_name'];

                if(resp['address_line1'] !== null){

                    document.getElementById('address').innerHTML = resp['address_line1'];

                }
                else{

                    document.getElementById('address-input').style.visibility= "visible";
                    document.getElementById('updateAddress').style.visibility= "visible";

                }

                if(resp['mobile_no'] !== null){

                    document.getElementById('phoneNumber').innerHTML = resp['mobile_no'];

                }
                else{

                    document.getElementById('mobile-input').style.visibility= "visible";
                    document.getElementById('updateMobile').style.visibility= "visible";
                }

            document.getElementById('email').innerHTML = resp['email_add'];

            }
         
        };
    
        request.send();
}





    

function updateAddress(){

let address = document.getElementById('address-input').value;
let email = document.getElementById('email').value;

let addressRegex = /^\s*\S+(?:\s+\S+){2}/;

document.getElementById('errMsg').style.visibility = "visible";

if(address === "" || address === null){

document.getElementById('updateErr').innerHTML = 'Please do not leave blank!';
}
if(!(address.match(addressRegex))){
    document.getElementById('updateErr').innerHTML = 'Please enter an appropriate address!';

}
else {

    let request = new XMLHttpRequest();
    let url = '/api/profile/update/address';
   
    let body = {
    address_line1 : address
    };
    request.open('POST', url);
    
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        
        let resp = JSON.parse(request.response);

        if(request.status === 200) {

            document.getElementById('errMsg').className="alert alert-success";
            document.getElementById('updateErr').style.color = "green";
    
            document.getElementById('address-input').style.visibility= "hidden";
            document.getElementById('updateAddress').style.visibility= "hidden";
        
        }   
        
        document.getElementById('updateErr').innerHTML = resp['message'];
     
    };

    request.send(JSON.stringify(body));



}

};

function updateMobile(){

    let mobile = document.getElementById('mobile-input').value;
    let email = document.getElementById('email').value;
    let mobileRegex = /^(?:(?:00)?44|0)7(?:[45789]\d{2}|624)\d{6}$/;

    document.getElementById('errMsg').className="alert alert-danger";
    document.getElementById('errMsg').style.visibility = "visible";
    document.getElementById('updateErr').style.color = "red";
    
    if(mobile === "" || mobile === null){

    document.getElementById('updateErr').innerHTML = 'Please do not leave blank!';

    }
    if(!(mobile.match(mobileRegex))){
    document.getElementById('updateErr').innerHTML = 'Please enter a valid Mobile Number!';
    }
    else {

        let request = new XMLHttpRequest();
        let url = '/api/profile/update/mobile';
       
        let body = {
        
        mobile_no: mobile,
        email_add : email
        };
        request.open('POST', url);
        
        request.setRequestHeader("Content-Type", "application/json");
        request.onload = function () {
            
            let resp = JSON.parse(request.response);
    
            if(request.status === 200) {
    
                document.getElementById('errMsg').className="alert alert-success";
                document.getElementById('updateErr').style.color = "green";
        
                document.getElementById('mobile-input').style.visibility= "hidden";
                document.getElementById('updateMobile').style.visibility= "hidden";
            
            }   
            
            document.getElementById('updateErr').innerHTML = resp['message'];
         
        };
    
        request.send(JSON.stringify(body));
    
    
    
    }





    
}