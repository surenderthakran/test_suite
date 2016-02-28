'use strict';

(function(app) {
    app.InformationComponent = ng.core.Component({
        selector: 'information',
        template: '<p>{{ account }}</p>'
    })
    .Class({
        constructor: function() {
            this.account = "Github"
        }
    });
})(window.app || (window.app = {}));
