;(function( $, window, document, undefined ){

	var defaultOptions = {
		totalFrames: 60
	};

	var SVGDraw = ( function( options ){

		function SVGDraw( svgWrapper, options ){
			this.$svgWrapper = $(svgWrapper);
			this.$img = this.$svgWrapper.find('img');
			this.$svg = this.$svgWrapper.find('svg');

			this.options = $.extend( {}, defaultOptions, options );

			this.paths = [];
			this.pathLengths = [];
			this.currentFrame = 0;
			this.drawHandle = 0;
			this.setup();
		}

		SVGDraw.prototype.setup = function( options ){
			var self = this;

			var fadeTransition = _cssTransition("opacity 0.3s");
			fadeTransition.opacity = 0.0;
			self.$img.css(fadeTransition);

			fadeTransition.opacity = 1.0;
			self.$svg.css(fadeTransition);

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

		SVGDraw.prototype.start = function(){
			var self = this;
			self.draw();
		};

		SVGDraw.prototype.draw = function(){
			var self = this;

			var progress = self.currentFrame / self.options.totalFrames;
			if( progress > 1 ){
				window.cancelAnimationFrame( self.drawHandle );

				var css = {};
				css.opacity = 1.0;
				self.$img.css(css);

				css.opacity = 0.0;
				self.$svg.css(css);
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

	function _instance( element, options ){
		var $element = $(element);
		var instance = $element.data( 'svgDrawInstance' );
		if( instance ) return instance;
		instance = new SVGDraw( element, options || {} );
		$element.data( 'svgDrawInstance', instance );
		return instance;
	}

	$.fn.svgDraw = function( options ){
		_instance( this, options );
		return this;
	};

	$.fn.start = function(){
		var instance = _instance( this );
		instance.start();
		return this;
	};

})( jQuery, window , document );