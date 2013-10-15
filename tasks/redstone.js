/*
 * grunt-redstone
 * https://github.com/sc-live/grunt-redstone
 *
 * Copyright (c) 2013 Axisto Media Ltd
 * Licensed under the MIT license.
 */

'use strict';

var Redstone = require('redstone');


// This function injects variables into commands
//
function insertVariablesIntoCommands (commands, variables) {
  var command, commandName, variable, variableName;
  for (commandName in commands) {
    command = commands[commandName];
    for (variableName in variables) {
      variable = variables[variableName];
      commands[commandName] = commands[commandName].replace(variableName, variable);
    }
  }
  return commands;
}



module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('redstone', 'deploying Node.js applications using redstone', function () {



    var done      = this.async();



    // Insert variables into commands, if they are passed in the options
    //
    if (this.data.variables) {
      this.data.commands = insertVariablesIntoCommands(this.data.commands, this.data.variables);
    }


    // Initialize Redstone
    //
    var redstone  = new Redstone(this.data);



    // Execute Redstone
    //
    var self = this;
    redstone.runCommands(this.data.commandsInOrder, function(err) {
      grunt.log.writeln(self.target + ': ' + self.data);

      if(err) { return done(err); }
      grunt.log.writeln('Commands: "' + self.options.commandsInOrder.join(', ') + '" run successfully.');
    });



  });

};