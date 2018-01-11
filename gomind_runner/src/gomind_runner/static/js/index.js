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
    drawChart(data);
  })
  .catch(function(err) {
    document.getElementById("status").textContent = "Training Failed!"
    console.error(err);
  });
}

function drawChart(data) {
  var series = [];
  for (var key in data) {
    series.push({
      name: key,
      data: data[key],
    })
  }
  var myChart = Highcharts.chart('container', {
    title: {
      text: 'ANN Output Chart'
    },
    series: series,
  });
}
