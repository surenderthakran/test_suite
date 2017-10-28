'use strict';

document.addEventListener('DOMContentLoaded', function(){
  trainNetwork();
});

function trainNetwork() {
  var myHeaders = new Headers();
  var myRequest = new Request(
    window.location.origin + '/train',
    {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    }
  );

  fetch(myRequest)
  .then(function(response) {
    console.log(response);
    if(response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then(function(data) {
    console.log(data);
    document.getElementById("status").textContent = "Training Complete!"
  })
  .catch(function(err) {
    console.error(err);
  });
}
