'use strict';

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    trainNetwork();
  });

  function trainNetwork() {
    Ajax.train().then((data) => {
      console.log(data);
      Status.message('Training Complete!');
      Chart.draw(data);
    }).catch((err) => {
      Status.message('Training Failed!');
      console.error(err);
    });
  }
})();
