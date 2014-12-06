module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON("svg-line-draw.jquery.json"),

		meta: {
			banner: "/*!\n" +
				" jQuery <%= pkg.name %> Plugin\n" +
				" @name jquery.svg-line-draw.js\n" +
				" @author <%= pkg.author.name %> (<%= pkg.author.url %>)\n" +
				" @version <%= pkg.version %>\n" + 
				" @category jQuery Plugin\n" +
				" @copyright (c) 2014 PonyCode Corporation (http://www.ponycode.com)\n" + 
				" @license Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.\n" + 
				" */\n"
		},


		concat: {
			dist: {
				src: ["src/jquery.svg-line-draw.js"],
				dest: "dist/jquery.svg-line-draw.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		jshint: {
			files: ["src/jquery.svg-line-draw.js"]
		},

		uglify: {
			my_target: {
				src: ["dist/jquery.svg-line-draw.js"],
				dest: "dist/jquery.svg-line-draw.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},
		
		watch: {
		    files: ['src/*'],
		    tasks: ['default']
		}

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["jshint", "concat", "uglify"]);
	grunt.registerTask("travis", ["jshint"]);

};
