'use strict';

(function(app) {
    app.DisplayComponent = ng.core.Component({
        selector: 'display',
        template: '<form>'
                + '<div *ngFor="#input of inputs">'
                + '<label attr.for="{{ input.name }}">{{ input.text }}</label>'
                + '<input name="{{ input.name }}">'
                + '</div>'
                + '<input name="test" #name>'
                + '<button (click)="getData(name)">Submit</button>'
                + '</form>'
                + '<article></article>'
    })
    .Class({
        constructor: function() {
            this.inputs = [
                {
                    name: "title",
                    text: "Title"
                },
                {
                    name: "image",
                    text: "Image"
                },
                {
                    name: "url",
                    text: "URL"
                }
            ];
        },
        getData: function (name) {
            console.log("inside getData()");
            console.log(name.value);
        }
    });
})(window.app || (window.app = {}));
