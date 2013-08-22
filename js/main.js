;(function( $, window, document, undefined ) {

	'use strict';

	window.cirro = window.cirro || {};

	var $window   = $(window);
	var $document = $(document);

	// The page (singleton object) controller
	var page = {

		init: function() {

			var self = this;

			self.$loader   = $('#loader');
			self.$navBtn   = $('#nav-btn');
			self.$phoneNav = $('nav.phone-nav');
			self.$frame    = $('.frame');
			self.$intro    = $('#intro');
			self.$work     = $('.top');

			// Init click event handlers
			self.$navBtn.on("click", self.closetNav);

			self.hideLoader();
			self.scrollPosition();
			self.scrollColor();
			self.workHover();

		},

		calculateWindowDimensions: function() {

			var self = this;

			self.wW = $window.width();
			self.wH = $window.height();

		},

		hideLoader: function() {

			var self = this;

			setTimeout( function(){

				self.$loader.fadeOut();

			}, 1000)

		},

		closetNav: function() {

			var self = page;

			// CALC HEIGHT OF NAV ELEMENTS

			// toggle the open class on the nav
			page.$phoneNav.toggleClass('open');

		},

		closetNavResize: function() {

			var self = this;
			var phoneNav = $('nav.phone-nav');
			var isOpen = ~~phoneNav.hasClass('open');

			// close nav closet if larger than 768px && open
			if (self.wW >= 768 && isOpen) {

				page.closetNav();
			}

		},

		scrollPosition: function() {

			var self = this;
			self.scrollPos = $window.scrollTop();

		},

		scrollColor: function() {

			var self = this;

			var height = self.scrollPos;

			self.$intro.css({ 'opacity' : (1 - height/700) });

		},

		workHover: function() {

			var self = this;
			var i    = 1000;

			self.$work.mouseenter(function(){

				i+= 2;

				$(this).css('z-index', i);

			})

		}

	};

	// Attach the page controller to the cirro namespace
	window.cirro.page = page;

	// Window load
	$window.load(function() {

		setTimeout(function() {
			page.init();
		})
		//page.calculateWindowDimensions();

	});

	// Window scroll
	$window.scroll(function() {

		page.scrollPosition();
		page.scrollColor();

	});

	// Window resize
	$window.resize(function() {

		page.calculateWindowDimensions();
		page.closetNavResize();

	});

}( jQuery, window, document ));