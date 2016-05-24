'use strict';

(function (app) {
    var Article = function (title, link, votes) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    };

    Article.prototype.voteUp = function () {
        this.votes++;
    };

    Article.prototype.voteDown = function () {
        this.votes--;
    };

    app.Article = Article;
})(window.app || (window.app = {}));
