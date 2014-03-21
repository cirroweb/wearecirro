/*global cirroNew, Backbone*/

cirroNew.Collections = cirroNew.Collections || {};

(function () {
    'use strict';

    cirroNew.Collections.WorkCollection = Backbone.Collection.extend({

        model: cirroNew.Models.WorkModel

    });

})();
