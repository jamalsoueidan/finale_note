module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      dirs: {
        handlebars: 'lib/web/public/assets/javascripts/templates'
      },
      emberTemplates: {
          compile: {
              options: {
                  templateBasePath: /lib\/web\/public\/assets\/javascripts\/templates\//
              },
              files: {
                  "<%= dirs.handlebars %>/../templates.js": ["<%= dirs.handlebars %>/**/*.hbs"]
              }
          }
      },
      watch: {
          emberTemplates: {
              files: ['<%= dirs.handlebars %>/**/*.hbs'],
              tasks: ['emberTemplates']
          }
      }
  });
   
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-watch');
   
  // Default task(s).
  return grunt.registerTask('default', ['emberTemplates']);
 
};
