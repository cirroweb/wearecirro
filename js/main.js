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
			// self.heads();
			self.scrollPosition();
			self.randomImages('.heads-container', 0, 0);
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

		randomImages: function(wrap, overlap, rotation) {
			// set initial variables
			var self = this,
			$wrap = $(wrap),
			$wrapImgs = $(wrap + ' img'),
			wrapWidth = parseInt($wrap.css('width'))-overlap,
			wrapHeight = parseInt($wrap.css('height'))-overlap,
			imgPositionLeft = [],
			imgPositionRight = [],
			imgPositionTop = [],
			imgPositionBottom = [];

			// loop through each img
			$.each($wrapImgs, function() {
				// Set variables specific to specific img or variables that need to be reset each
				// new img
				var imgWidth = parseInt($(this).css('width')),
					  imgHeight = parseInt($(this).css('height')),
					  imgTop = Math.random()*(wrapHeight-imgHeight)+overlap,
						imgLeft = Math.random()*(wrapWidth-imgWidth)+overlap,
						imgRight = imgLeft+imgWidth-overlap,
						imgBottom = imgTop+imgHeight-overlap,
						degRot = (rotation-(Math.random()*(rotation*2))) + 'deg',
						attempt = 0;

				// if overlap value given is greater than an overlap can be then set it to something
				// workable
				if(overlap > (imgWidth-10) || overlap > (imgHeight-10)) {
					if(imgWidth < imgHeight){
						overlap = imgWidth-10;
					} else {
						overlap = imgHeight-10;
					}
				}

				// if setting position of first picture, skip checking for collision/overlap
				if(imgPositionLeft.length === 0) {
					$(this).css({
						'top': imgTop + 'px',
						'left': imgLeft + 'px'
					});

					// Push up first img positions to proper arrays for checking for collisions/overlap
					imgPositionTop.push(imgTop);
					imgPositionLeft.push(imgLeft);
					imgPositionRight.push(imgRight);
					imgPositionBottom.push(imgBottom);
					
				} else {
					// For loop for checking overlap/collisions with all already placed imgs
					for(var i=0; i<imgPositionTop.length; i++) {
						// Logic for overlap/collision: must pass both logic statements for actual overlap
						if((imgLeft>imgPositionLeft[i] && imgLeft<imgPositionRight[i]) || (imgRight>imgPositionLeft[i] && imgRight<imgPositionRight[i])) {
							if((imgTop>imgPositionTop[i] && imgTop<imgPositionBottom[i]) || (imgBottom>imgPositionTop[i] && imgBottom<imgPositionBottom[i])) {
								attempt++;
								// If 3000 placement attempts are made then ignore overlap rules and place
								// picture. This only happens when browser is small (chances exponentially
								// grow small the window) and is necessary for small browser windows escaping
								// infinite loop
								if(attempt>3000) {
									imgTop = Math.random()*(wrapHeight-imgHeight);
									imgLeft = Math.random()*(wrapWidth-imgWidth);
									imgRight = imgLeft+imgWidth;
									imgBottom = imgTop+imgHeight;
								} else {
									// Choose another random img placement since failed overlap logic and
									// set iteration back to the beginning of the loop to check all existing
									// imgs that are placed
									imgTop = Math.random()*(wrapHeight-imgHeight)+overlap,
									imgLeft = Math.random()*(wrapWidth-imgWidth)+overlap,
									imgRight = imgLeft+imgWidth-overlap,
									imgBottom = imgTop+imgHeight-overlap;
									i=-1;
								}
							}
						}
					}
					// After finding a successful img placement push positions to arrays
					imgPositionTop.push('top', imgTop);
					imgPositionLeft.push('left', imgLeft);
					imgPositionRight.push('right',imgRight);
					imgPositionBottom.push('bottom',imgBottom);
					// After finding a successful img placement place the img
					$(this).css({
						'top': imgTop + 'px',
						'left': imgLeft + 'px'
					});
				}
				// Set rotation
				$(this).css({
					'-moz-transform':'rotate('+degRot+')',
					'-webkit-transform':'rotate('+degRot+')',
					'-o-transform':'rotate('+degRot+')',
					'-ms-transform':'rotate('+degRot+')',
					'transform':'rotate('+degRot+')'
				})
				
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