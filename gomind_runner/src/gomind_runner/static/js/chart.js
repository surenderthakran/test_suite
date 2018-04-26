'use stricy';

window.Chart = class {
  static draw(data) {
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
}
