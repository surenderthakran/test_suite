'use strict';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('train').addEventListener('click', () => {
      trainNetwork();
    });
  });

  function trainNetwork() {
    Status.message('Training...');
    window.Library.Ajax.train().then((data) => {
      console.log(data);
      Status.message('Training Complete!');
      Chart.draw(data);
    }).catch((err) => {
      Status.message('Training Failed!');
      console.error(err);
    });
  }
})();
