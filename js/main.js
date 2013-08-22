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
			self.$loader   = $('#loader');
			self.$gif      = $('#gif')
			self.$navBtn   = $('#nav-btn');
			self.$phoneNav = $('nav.phone-nav');
			self.$intro    = $('#intro');

			// Init click event handlers
			self.$navBtn.on("click", self.closetNav);

			self.hideLoader();
			self.heads();
			self.scrollPosition();
			self.introCenter();
			//self.workHover();
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

		introCenter: function() {
			var wH = page.wH;
			var iH = page.$intro.height();
			var $intro = page.$intro;
			var diff = (wH - iH) / 2;

			$intro.css('top', diff);			
		},

		heads: function() {
			var wH = page.wH / 1.5,
					wW = page.wW / 1.5,
					$heads = $('.heads-container img');

			$.each($heads, function() {
				var randomW = Math.floor(Math.random()*wW);
				var randomH= Math.floor(Math.random()*wH);

				$(this).css({
					top: randomH,
					left: randomW
				});
			})
			
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
		page.calculateWindowDimensions();
	});

	// Window scroll
	$window.scroll(function() {
		page.scrollPosition();
	});

	// Window resize
	$window.resize(function() {
		page.calculateWindowDimensions();
		page.introCenter();
		page.closetNavResize();
	});

}( jQuery, window, document ));