module.exports = function(grunt) {
	//01 : config : tạo projec -> đọc file json
	grunt.initConfig({
		mPkg: grunt.file.readJSON("package.json"),
		dirs: {  // định nghĩa đường dẫn
			inputSCSS : 'development/sass',
			inputJS: 'development/js',
			inputHTMLElement : 'development/html-elements',
			
			outputCSS: 'production/css',
			outputJS: 'production/js',
			

		},

		//01: CSS
		cssmin: {
			options: {
			},
			
			target: {
				files: {
					'<%= dirs.outputCSS %>/main.css' : '<%= dirs.outputCSS %>/main.css'
					
				}
			}
		},
		//02: Uglify
		uglify: {
			options: {
				beautify : false,
				compress: {
					drop_console: false   // bỏ đi câu lệnh console.log
				}
			},
			my_target: {
				files: {
					'<%= dirs.outputJS %>/menu.js': ['<%= dirs.inputJS %>/menu.js']
				}	
			}
		},

		//03: Sass
		sass: {
			options: {
				
				outputStyle : 'expanded',
			},
			
			files: {
				src : '<%= dirs.inputSCSS %>/main.scss',
				dest : '<%= dirs.outputCSS %>/main.css', 
			}

		},

    	//04: Watch
    	watch: {
    		scripts: {
    			files: [
    			'<%= dirs.inputSCSS %>/*.scss', //sass/*.scss
    			'<%= dirs.inputSCSS %>/*/*.scss', 
    			'<%= dirs.inputJS%>/*.js', 
    			'development/index.html',
    			'<%= dirs.inputHTMLElement %>/*.html',
    			'<%= dirs.inputHTMLElement %>/*/*.html',
    			],
    			tasks: ['sass','includes','uglify'],
    			options: {
    				spawn: false,
    				livereload : true,
    			},
    		},
    	},

    	//Connect
    	connect: {
    		server: {
    			options: {
    				hostname : 'localhost',
    				port: 3069,
    				base : 'production/',
    				livereload : true,

    			}
    		}
    	},

    	//INCLUDE
    	includes: {
    		files: {
    			src: ['development/index.html'], // Source files 
   				dest: 'production/', // Destination directory 
   				flatten: true,
   				cwd: '.',
   				options: {
   					silent: true,
   					banner: '<!-- I am a banner <% includes.files.dest %> -->'
   				}
   			}
   		}

   	});
	
	//02 :load plugin
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-includes');

	//03 : register task
	
	
	grunt.registerTask('dev', ['includes','sass','uglify','connect','watch']);
	grunt.registerTask('public', ['cssmin','uglify']);

}
