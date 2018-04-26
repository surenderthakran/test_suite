'use strict';

window.Status = class {
  static message(message) {
    document.getElementById('status').textContent = message;
  }
}
