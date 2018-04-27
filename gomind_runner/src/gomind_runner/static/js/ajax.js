'use strict';

window.Library.Ajax = class {
  static train() {
    return new Promise((resolve, reject) => {
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
          resolve(response.json());
        } else {
          reject(Error(response.statusText));
        }
      })
    });
  }
}
