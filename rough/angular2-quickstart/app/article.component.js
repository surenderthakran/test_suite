'use strict';

(function(app) {
    app.ArticleComponent = ng.core.Component({
        selector: 'article',
        host: {
            class: "row"
        },
        template: '<div>'
                + '<p style="margin: 0; padding: 0;">{{ article.votes }}</p>'
                + '<a href="{{ article.link }}">{{ article.title }}</a>'
                + '<a href (click)="voteUp()">Vote Up</a>'
                + '<a href (click)="voteDown()">Vote Down</a>'
                + '</div>'
    })
    .Class({
        constructor: function() {
            this.article = new app.Article("Angular 2", "http://angular.io", 10);
        },
        voteUp: function () {
            this.article.voteUp();
            return false;
        },
        voteDown: function () {
            this.article.voteDown();
            return false;
        }
    });
})(window.app || (window.app = {}));
