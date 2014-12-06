# SVG Line Draw

### Turn your SVG into an animated line drawing

You can use this plugin to create that cool "lines drawing into an image" effect

![Example animation](/demo/svg-line-draw.gif?raw=true "Example animation")

## Usage

1. Create an SVG:

	I highly recommend using [Sketch](http://bohemiancoding.com/sketch/) to create your SVG. You need to use the Vector line drawing tool
	to build your shapes. This plugin will automatically draw all `Path` elements within the SVG. Once
	you have exported your SVG from Sketch you can embed it directly into your HTML as seen in the demo.

2. Include jQuery and SVG Line Draw:

	```html
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
	<script src="/javascript/jquery.svg-line-draw.min.js"></script>
	```
3. Setup your HTML / SVG / IMAGE:
	
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
	
4. Initialize:

	```javascript
	$('.lineAnimation').svgDraw({
		totalFrames: 60, 	// Number of frames - fewer frames for faster animations
		fadeToImage: false 	// Should the SVG fade into an image when the animation is done?
	});
	```

5. Start the animation:

	```javascript
	$('.lineAnimation').startSvgDraw( function(){
		console.log( "Animation is all done" );
	});
	```
	
6. Profit


## Options

* **totalFrames**: Fewer frames result in faster animations. Default is 60.
* **fadeToImage**: If true and your container div has an IMG and an SVG, the plugin will use CSS3 transitions to fade from the SVG line drawing to your image. See the demo. Default is false.
* **fadeTransition**: If you are using `fadeToImage` then this can be used to override the type of CSS3 transition. Default is `opacity 0.3s`.



#### [View Demo](http://htmlpreview.github.io/?https://github.com/ponycode/jquery-svg-line-draw/blob/master/demo/index.html)

#### [Get The JS](https://github.com/ponycode/jquery-svg-line-draw/tree/master/dist)

#### Thanks

This explanation was super helpful: [http://css-tricks.com/svg-line-animation-works/](http://css-tricks.com/svg-line-animation-works/)

My first version of the code was based on this: [http://tympanus.net/codrops/2013/12/30/svg-drawing-animation/](http://tympanus.net/codrops/2013/12/30/svg-drawing-animation/)
