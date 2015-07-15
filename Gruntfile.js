module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		clean: {
			dist: {
				src: ['dist']
			}
		},

		copy: {
			appPlugins: {
				cwd: 'src/Umbraco.GridLocker.Web.UI/App_Plugins/',
				src: ['Umbraco.GridLocker/*'],
				dest: 'dist/App_PLugins/',
				expand: true
			}
		},

		umbracoPackage: {
			options: {
				name: "Umbraco.GridLocker",
				version: '1.0.0.1',
				url: 'https://github.com/ninjaonsafari/Umbraco.GridLocker',
				license: 'MIT',
				licenseUrl: 'http://opensource.org/licenses/MIT',
				author: 'ninjaonsafari',
				authorUrl: 'https://github.com/ninjaonsafari',
				manifest: 'config/package.xml',    // File containing your package manifest template
				readme: 'config/readme.txt',       // Optional text file to insert into the package manifest's <readme> field
				sourceDir: 'dist/',
				outputDir: 'dist',                       // Directory to place the generated package file
			}
		}
	});

	grunt.registerTask('default', ['clean:dist', 'copy:appPlugins']);
	grunt.registerTask('package', ['default', 'umbracoPackage']);
};