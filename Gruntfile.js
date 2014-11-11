module.exports = function(grunt) {

		grunt.initConfig({
			pkg: grunt.file.readJSON('package.json'),

			watch: {
				css: {
					files: ['src/sass/**/*.scss'],
					tasks: ['compass', 'autoprefixer'],
					options: {
						spawn: false,
						livereload: true
					},
				}
			},
			compass: {
			    dist: {
			    	options: {
			    		httpPath: '/',
			        	cssDir: 'dist/css',
			        	sassDir: 'src/sass/main',
			        	imagesDir: 'dist/img',
			        	spriteLoadPath: 'src/sprites',
			        	outputStyle: 'expanded',
			        	relativeAssets: true,
			        	noLineComments: true,
			        	sourcemap: true
			    	}
			    }
			},
			autoprefixer: {
				options: {
					map: true,
					browsers: ['ie >= 7', 'Firefox >= 3.6', 'Chrome >= 5', 'Opera >= 10.10']
				},
				no_dest: {
					src: 'dist/css/main.css'
				}
			}
		});

		grunt.loadNpmTasks('grunt-contrib-watch');
		grunt.loadNpmTasks('grunt-contrib-compass');
		// grunt.loadNpmTasks('grunt-notify');
		grunt.loadNpmTasks('grunt-autoprefixer');

		grunt.registerTask('default', ['watch']);
}