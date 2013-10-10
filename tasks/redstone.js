/*
 * grunt-redstone
 * https://github.com/sc-live/grunt-redstone
 *
 * Copyright (c) 2013 Axisto Media Ltd
 * Licensed under the MIT license.
 */

'use strict';

var Redstone = require('redstone');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('redstone', 'deploying Node.js applications using redstone', function(runCommands) {

    var done = this.async();

    var options = this.options({
      ssh: {
        hostname   : null,
        user       : null
      },
      commands: {
        list_files: "ls -ll",
        print_date: "date"
      },
      runCommands: []
    });

    var redstone = new Redstone(options);

    redstone.runCommands(runCommands || options.runCommands || [], function(err) {
      if(err) { return done(err); }
      grunt.log.writeln('Commands: "' + options.runCommands.join(', ') + '" run successfully.');
      done();
    });

  });

};
