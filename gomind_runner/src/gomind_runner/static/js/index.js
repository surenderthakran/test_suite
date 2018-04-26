'use strict';

document.addEventListener('DOMContentLoaded', () => {
  trainNetwork();
});

function trainNetwork() {
  const myHeaders = new Headers();
  const myRequest = new Request(
    window.location.origin + '/train',
    {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
    }
  );

  fetch(myRequest)
  .then((response) => {
    console.log(response);
    if(response.ok) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  })
  .then((data) => {
    console.log(data);
    document.getElementById("status").textContent = "Training Complete!"
    drawChart(data);
  })
  .catch((err) => {
    document.getElementById("status").textContent = "Training Failed!"
    console.error(err);
  });
}

function drawChart(data) {
  const series = [];
  for (let key in data) {
    series.push({
      name: key,
      data: data[key],
    });
  }
  const myChart = Highcharts.chart('container', {
    title: {
      text: 'ANN Output Chart'
    },
    series: series,
  });
}
