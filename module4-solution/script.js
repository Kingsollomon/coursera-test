(function(window) {
  'use strict';

  // Helper to grab elements by ID and throw if missing
  function getElement(id) {
    var el = document.getElementById(id);
    if (!el) {
      throw new Error('Required element #' + id + ' not found');
    }
    return el;
  }

  // Clear out greetings before *each* Jasmine spec to avoid bleed-over
  if (typeof jasmine !== 'undefined' && jasmine.getEnv) {
    jasmine.getEnv().beforeEach(function() {
      var gc = document.getElementById('greetings-container');
      if (gc) {
        gc.innerHTML = '';
      }
    });
  }

  // Initialize UI once the DOM is ready
  function init() {
    var names = [
      'Yaakov', 'John', 'Jen', 'Jason', 'Paul',
      'Frank',  'Larry','Paula','Laura','Jim'
    ];

    // Alphabetize
    names.sort(function(a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    var helloContainer     = getElement('buttons-hello-container');
    var byeContainer       = getElement('buttons-bye-container');
    var greetingsContainer = getElement('greetings-container');
    var clearBtn           = getElement('clear-btn');

    names.forEach(function(name) {
      var button = document.createElement('button');
      button.textContent = name;
      button.setAttribute('aria-label', 'Greet ' + name);

      var isBye    = name.charAt(0).toLowerCase() === 'j';
      var speaker  = isBye ? byeSpeaker : helloSpeaker;
      var cssClass = isBye ? 'bye' : 'hello';

      button.addEventListener('click', function() {
        // Log and append
        speaker.speak(name);
        var p = document.createElement('p');
        p.textContent = speaker.speakSimple(name);
        p.classList.add(cssClass);
        greetingsContainer.appendChild(p);
      });

      (isBye ? byeContainer : helloContainer).appendChild(button);
    });

    // Clear all greetings on demand
    clearBtn.addEventListener('click', function() {
      greetingsContainer.innerHTML = '';
    });
  }

  // Run init() now or on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);
