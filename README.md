# jQuery SVG Line Draw

### Watch your SVG's draw in web pages

You can use this plugin to create that cool "lines drawing into an image" effect

![Example animation](/demo/svg-line-draw.gif?raw=true "Example animation")

## Usage

1. Include jQuery and SVG Line Draw:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="/javascript/jquery.svg-line-draw.min.js"></script>
	```
2. Setup your HTML / SVG / IMAGE:
	
	You'll need to wrap your SVG and Image(optional) in a containing div which you will select using jQuery.	
	```html
	<div class="lineAnimation">
		<img class="plugImage" src="CurtziPlugLineDrawing.png"/>
		<svg class="plugSVG" preserveAspectRatio="xMinYMin meet" viewBox="0 0 1000 600" version="1.1">
			I have omitted the SVG guts. Your SVG should contains 
			Path elements which will be drawn. You can draw as many 
			paths as you want. See the demo included in this project 
			for a working example.
		</svg>
	</div>
	```
	
	NOTE: It's easiest to align the SVG and Image if they have fixed widths. In this example both the SVG and Image are set to fill the .lineAnimation container. Notice that the SVG has `preserveAspectRatio="xMinYMin meet"` set which causes it to fill it's container.
	
3. Call setup:

	```javascript
	$('.lineAnimation').svgDraw({
		totalFrames: 60, 	// Number of frames - fewer frames for faster animations
		fadeToImage: false 	// Should the SVG fade into an image when the animation is done?
	});
	```

4. Start the animation:

	```javascript
	$('.lineAnimation').startSvgDraw( function(){
		console.log( "Animation is all done" );
	});
	```

#### [Demo](http://htmlpreview.github.io/?https://github.com/ponycode/jquery-svg-line-draw/blob/master/demo/index.html)

#### [Distribution](https://github.com/ponycode/jquery-svg-line-draw/tree/master/dist)

Contains the minified JS
