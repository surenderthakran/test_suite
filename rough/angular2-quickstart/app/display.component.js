'use strict';

(function(app) {
    app.DisplayComponent = ng.core.Component({
        selector: 'display',
        template: '<form>'
                + '<label attr.for="title">Title</label>'
                + '<input name="title" #title>'
                + '<label attr.for="link">Link</label>'
                + '<input name="link" #link>'
                + '<button (click)="addArticle(title, link)">Submit</button>'
                + '</form>'
                + '<article></article>'
    })
    .Class({
        constructor: function() {
            this.articles = [
                new app.Article("Angular 2.1", "http://angular.io", 1)
            ];
            ng.platform.browser.bootstrap(app.ArticleComponent);
        },
        addArticle: function (title, link) {
            console.log("inside addArticle()");
            console.log(title.value);
            console.log(link.value);
        }
    });
})(window.app || (window.app = {}));
