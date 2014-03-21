/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);

/* cirro code hurrrr */
;(function( $, window, document, undefined ) {

	'use strict';

	window.cirro = window.cirro || {};

	var $window   = $(window);
	var $document = $(document);

	// The page (singleton object) controller
	var page = {

		init: function() {
			var self = this;

			self.wW, self.wH;
			self.$body        = $('body');
			self.$loader      = $('#loader');
			self.$scrollNumba = $('div.scroll');
			self.$logo        = $('.logo svg');
			self.$name 				= $('div.name');
			self.color = Array('black', 'white', 'blue', 'green', 'cream');

			self.scrollPosition();

			self.$logo.on('click', self.changeColor);
			self.$name.on('click', self.changeColor);
		},

		randoColor: function() {
			var randoItem = page.color[Math.floor(Math.random()*page.color.length)];
			return randoItem;
		},

		changeColor: function() {
			var newColor = page.randoColor();
			if (page.$body.hasClass(newColor)) {
				newColor = page.randoColor();
			}

			page.$body.removeClass().addClass(newColor);
		},

		calculateWindowDimensions: function() {
			var self = this;

			self.wW = $window.width();
			self.wH = $window.height();
		},

		hideLoader: function() {
			var self = this;

			setTimeout( function(){
				self.$gif.fadeOut();
				setTimeout( function(){
					self.$loader.fadeOut();
				}, 500)
			}, 2000)
		},

		scrollPosition: function() {
			var self = page;
			var scrollPos = $window.scrollTop();
			//self.$scrollNumba.html(scrollPos);
		},

	};

	// Attach the page controller to the cirro namespace
	window.cirro.page = page;

	$(window).on("scroll resize", function () {
      var pos = $('#project-title').offset();
      $('.section').each(function () {
          if (pos.top >= $(this).offset().top && pos.top <= $(this).next().offset().top) {
              $('#project-title').html($(this).find('.description').text());
              return; //break the loop
          }
      });
    });

    $(document).ready(function () {
        $(window).trigger('scroll'); // init the value
    });

	// Window load
	$window.load(function() {
		setTimeout(function() {
			page.init();
		})
		page.calculateWindowDimensions();
	});

	// Window scroll
	$(window).scroll( $.throttle( 50, page.scrollPosition ) );

	// Window resize
	$window.resize(function() {
		page.calculateWindowDimensions();
	});

}( jQuery, window, document ));