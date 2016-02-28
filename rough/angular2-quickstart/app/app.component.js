'use strict';

(function(app) {
    app.AppComponent = ng.core.Component({
        selector: 'my-app',
        template: '<h1>{{name}} Blog</h1>'
                + '<information></information>'
    })
    .Class({
        constructor: function() {
            this.name = "Surender's";
            ng.platform.browser.bootstrap(app.DisplayComponent);
            ng.platform.browser.bootstrap(app.InformationComponent);
            ng.platform.browser.bootstrap(app.ArticleComponent);
        }
    });
})(window.app || (window.app = {}));
