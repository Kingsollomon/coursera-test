(function(global) {
  'use strict';

  var helloSpeaker = {};
  var speakWord    = 'Hello';

  helloSpeaker.speak = function(name) {
    console.log(speakWord + ' ' + name);
  };

  helloSpeaker.speakSimple = function(name) {
    return speakWord + ' ' + name;
  };

  global.helloSpeaker = helloSpeaker;
})(window);
