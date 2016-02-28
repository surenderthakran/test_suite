'use strict';

(function(app) {
    app.ArticleComponent = ng.core.Component({
        selector: 'article',
        template: '<div>'
                + '<p>{{ votes }}</p>'
                + '<a href="{{ link }}">{{ title }}</a>'
                + '<a href (click)="voteUp()">Vote Up</a>'
                + '<a href (click)="voteDown()">Vote Down</a>'
                + '</div>'
    })
    .Class({
        constructor: function() {
            this.votes = 10;
            this.title = "Angular 2";
            this.link = "http://angular.io";
        },
        voteUp: function () {
            this.votes++;
            return false;
        },
        voteDown: function () {
            this.votes--;
            return false;
        }
    });
})(window.app || (window.app = {}));
