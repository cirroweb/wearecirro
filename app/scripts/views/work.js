/*global cirroNew, Backbone, JST*/

cirroNew.Views = cirroNew.Views || {};

(function () {
    'use strict';

    cirroNew.Views.WorkView = Backbone.View.extend({

        template: JST['app/scripts/templates/work.ejs']

    });

})();
