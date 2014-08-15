module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('grunt-karma')(grunt);

  //cant load this with require
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-banner');

  if (grunt.option('target') && !grunt.file.isDir(grunt.option('target'))) {
    grunt.fail.warn('The --target option specified is not a valid directory');
  }
    
  grunt.initConfig({
      packageVersion: function () {
        var buildVersion = grunt.option('buildversion') || '1.0.0.1',
            packageSuffix = grunt.option('packagesuffix') || 'build',
            buildBranch = grunt.option('buildbranch') || 'master';

        var findPoint = buildVersion.lastIndexOf(".");
        var basePackageVer = buildVersion.substring(0, findPoint);
        var buildNumber = buildVersion.substring(findPoint + 1, buildVersion.length);
        if (buildBranch.toLowerCase() != 'release') {
            return basePackageVer + "-" + 'build' + buildNumber;
        } else if (packageSuffix != 'build' && packageSuffix.length > 0) {
            return basePackageVer + "-" + packageSuffix;
        } else {
            return basePackageVer;
        }
    },
    pkg: grunt.file.readJSON('package.json'),
    dest: grunt.option('target') || 'dist',
    basePath: 'App_Plugins/<%= pkg.name %>',
	banner:
        '*! <%= pkg.title || pkg.name %> - v<%= packageVersion() %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
        ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' +
        ' * Licensed <%= pkg.license %>\n *',
    //Concat all the JS files into one
    concat: {
      dist: {
        src: [
          'app/scripts/**/*.js'
        ],
        dest: '<%= dest %>/<%= basePath %>/js/YouTube.js',
        nonull: true,
		options: {
			banner: "/<%= banner %>/\n\n"
		}
      }
    },

    //Compile the less file into a CSS file
    less: {
      dist: {
        options: {
            paths: ['app/styles'],
        },
        files: {
          '<%= dest %>/<%= basePath %>/css/YouTube.css': 'app/styles/YouTube.less',
        },
      }
    },

    cssmin: {
        add_banner: {
            options: {
                banner: "/<%= banner %>/\n"
            },
            files: {
                '<%= dest %>/<%= basePath %>/css/YouTube.css': ['<%= dest %>/<%= basePath %>/css/YouTube.css']
            }
        }
    },

    usebanner: {
        taskName: {
            options: {
                position: 'top',
                banner: '<!--\n <%= banner %> -->\n',
            },
            files: {
                src: [ '<%= dest %>/<%= basePath %>/views/**/*.html' ]
            }
        }
    },

    watch: {
      options: {
        atBegin: true
      },

      less: {
        files: ['app/styles/**/*.less'],
        tasks: ['less:dist']
      },

      js: {
        files: ['app/scripts/**/*.js'],
        tasks: ['concat:dist']
      },

      testControllers: {
        files: ['app/scripts/**/*.controller.js', 'test/specs/**/*.spec.js'],
        tasks: ['jshint', 'test']
      },

      html: {
        files: ['app/views/**/*.html'],
        tasks: ['copy:views']
      },

      config: {
        files: ['config/package.manifest'],
        tasks: ['copy:config']
      }
    },

    copy: {
      config: {
        src: 'config/package.manifest',
        dest: '<%= dest %>/<%= basePath %>/package.manifest',
      },

      views: {
        expand: true,
        cwd: 'app/views/',
        src: '**',
        dest: '<%= dest %>/<%= basePath %>/views/'
      },

      nuget: {
        expand: true,
        cwd: '<%= dest %>',
        src: '<%= basePath %>/**',
        dest: 'tmp/nuget/content/'
      },      

      umbraco: {
        expand: true,
        cwd: '<%= dest %>/',
        src: '<%= basePath %>/**',
        dest: 'tmp/umbraco/'
      },

      umbracoBin: {
        expand: true,
        cwd: 'bin/',
        src: '**',
        dest: 'tmp/umbraco/bin'
      },

      testAssets: {
        expand: true,
        cwd: '<%= dest %>',
        src: ['js/umbraco.*.js', 'lib/**/*.js'],
        dest: 'test/assets/'
      }
    },

    template: {
      nuspec: {
        options: {
          data: {
            name:        '<%= pkg.name %>',
            version:     '<%= pkg.version %>',
            author:      '<%= pkg.author.name %>',
            description: '<%= pkg.description %>'
          }
        },
        files: {
          'tmp/nuget/<%= pkg.name %>.nuspec': 'config/package.nuspec'
        }
      }
    },

    mkdir: {
      pkg: {
        options: {
          create: ['pkg/nuget', 'pkg/umbraco']
        },
      },
    },

    nugetpack: {
      dist: {
        src: 'tmp/nuget/<%= pkg.name %>.nuspec',
        dest: 'pkg/nuget/'
      }
    },

    umbracoPackage: {
      options: {
        name:        '<%= pkg.name %>',
        version:     '<%= pkg.version %>',
        url:         '<%= pkg.url %>',
        license:     '<%= pkg.license %>',
        licenseUrl:  '<%= pkg.licenseUrl %>',
        author:      '<%= pkg.author %>',
        authorUrl:   '<%= pkg.authorUrl %>',
        manifest:    'config/package.xml',
        readme:      'config/readme.txt',
        sourceDir:   'tmp/umbraco',
        outputDir:   'pkg/umbraco',
      }
    },

    clean: {
      dist: '[object Object]',
      test: 'test/assets'
    },

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    },

    jshint: {
      dev: {
        files: {
          src: ['app/scripts/**/*.js']
        },
        options: {
          curly: true,
          eqeqeq: true,
          immed: true,
          latedef: true,
          newcap: true,
          noarg: true,
          sub: true,
          boss: true,
          eqnull: true,
          //NOTE: we need to use eval sometimes so ignore it
          evil: true,
          //NOTE: we need to check for strings such as "javascript:" so don't throw errors regarding those
          scripturl: true,
          //NOTE: we ignore tabs vs spaces because enforcing that causes lots of errors depending on the text editor being used
          smarttabs: true,
          globals: {}
        }
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'concat', 'less', 'cssmin', 'copy:config', 'copy:views', 'usebanner']);
  grunt.registerTask('nuget', ['clean', 'default', 'copy:nuget', 'template:nuspec', 'mkdir:pkg', 'nugetpack']);
  grunt.registerTask('package', ['clean', 'default', 'copy:umbraco', 'copy:umbracoBin','mkdir:pkg', 'umbracoPackage']);
  
  grunt.registerTask('test', 'Clean, copy test assets, test', function () {
    var assetsDir = grunt.config.get('dest');
    //copies over umbraco assets from --target, this must point at the /umbraco/ directory
    if (assetsDir !== 'dist') {
      grunt.task.run(['clean:test', 'copy:testAssets', 'karma']);
    } else if (grunt.file.isDir('test/assets/js/')) {
      grunt.log.oklns('Test assets found, running tests');
      grunt.task.run(['karma']);
    } else {
      grunt.log.errorlns('Tests assets not found, skipping tests');
    }
  });
};
