;(function( $, window, document, undefined ){

	var defaultOptions = {
		totalFrames: 60,
		fadeToImage: false,
		fadeTransition: "opacity 0.3s"
	};

	var SVGDraw = ( function( options ){

		function SVGDraw( svgWrapper, options ){
			this.$svgWrapper = $(svgWrapper);

			this.options = $.extend( {}, defaultOptions, options );

			this.paths = [];
			this.pathLengths = [];
			this.currentFrame = 0;
			this.drawHandle = 0;
			this.setup();
		}

		SVGDraw.prototype.setup = function(){
			var self = this;

			if( self.options.fadeToImage ){
				self.$img = this.$svgWrapper.find('img');
				self.$svg = this.$svgWrapper.find('svg');
				
				var fadeTransition = _cssTransition( self.options.fadeTransition );
				fadeTransition.opacity = 0.0;
				self.$img.css(fadeTransition);

				fadeTransition.opacity = 1.0;
				self.$svg.css(fadeTransition);
			}
			
			self.preparePaths();
		};

		SVGDraw.prototype.preparePaths = function( options ){
			var self = this;
			self.paths = self.$svgWrapper.find('svg path').each(function(){
				var $path = $(this);
				var pathLength = this.getTotalLength();

				$path.css({
					strokeDasharray: pathLength + ' ' + pathLength,
					strokeDashoffset: pathLength
				});

				self.pathLengths.push( pathLength );
			});
		};

		function _cssTransition( transition ){
			var css = {};
			css["-webkit-transition"] = transition;
			css["-moz-transition"] = transition;
			css["-ms-transition"] = transition;
			css["-o-transition"] = transition;
			css.transition = transition;
			return css;
		}

		SVGDraw.prototype.start = function( callback ){
			var self = this;
			self.options.callback = callback;
			self.draw();
		};

		SVGDraw.prototype.draw = function(){
			var self = this;

			var progress = self.currentFrame / self.options.totalFrames;
			if( progress > 1 ){
				window.cancelAnimationFrame( self.drawHandle );

				if( self.options.fadeToImage ){
					var css = {};
					css.opacity = 1.0;
					self.$img.css( css );

					css.opacity = 0.0;
					self.$svg.css( css );
				}
				
				if( self.options.callback ) self.options.callback();
			}else{
				self.currentFrame++;

				var j = 0;
				self.paths.each(function(){
					var $path = $(this);
					$path.css({
						strokeDashoffset: Math.floor( self.pathLengths[j] * (1 - progress) )
					});
					j++;
				});

				self.drawHandle = window.requestAnimationFrame( self.draw.bind( this ) );
			}
		};

		return SVGDraw;
	})();

	function _instance( element, options, forceNew ){
		var $element = $(element);
		var instance = $element.data( 'svgDrawInstance' );
		if( instance && !forceNew ) return instance;
		instance = new SVGDraw( element, options || {} );
		$element.data( 'svgDrawInstance', instance );
		return instance;
	}

	$.fn.svgDraw = function( options ){
		_instance( this, options, true );
		return this;
	};

	$.fn.startSvgDraw = function( callback ){
		var instance = _instance( this );
		instance.start( callback );
		return this;
	};

})( jQuery, window , document );