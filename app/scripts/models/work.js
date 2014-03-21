/*global cirroNew, Backbone*/

cirroNew.Models = cirroNew.Models || {};

(function () {
    'use strict';

    cirroNew.Models.WorkModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
