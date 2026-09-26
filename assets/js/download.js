/* ==========================================================================
   ModDongGam - download.js
   15 second countdown gate on download.html, then reveals the mirror buttons.
   Vanilla JavaScript, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var COUNTDOWN_SECONDS = 15;

  function $(selector) {
    return document.querySelector(selector);
  }

  function initCountdown() {
    var circle = $('[data-timer]');
    var label = $('[data-timer-label]');
    var progressBar = $('[data-progress-bar]');
    var gate = $('[data-download-gate]');   // timer + waiting ad block
    var links = $('[data-download-links]'); // the 3 mirror buttons
    var fileName = $('[data-file-name]');

    if (!circle || !links) return;

    /* Optional deep-link support: download.html?game=PUBG%20Mobile&size=780%20MB */
    var params = new URLSearchParams(window.location.search);
    var gameName = params.get('game');
    var gameSize = params.get('size');

    if (gameName) {
      document.title = 'Download ' + gameName + ' MOD APK - ModDongGam';
      var heading = $('[data-game-heading]');
      if (heading) heading.textContent = gameName;
      if (fileName) fileName.textContent = gameName;
    }
    if (gameSize) {
      var sizeEl = $('[data-file-size]');
      if (sizeEl) sizeEl.textContent = gameSize;
    }

    var remaining = COUNTDOWN_SECONDS;
    var total = COUNTDOWN_SECONDS;

    function render(secondsLeft) {
      circle.textContent = secondsLeft > 0 ? secondsLeft : 'OK';
      if (label) {
        label.textContent = secondsLeft > 0
          ? 'Preparing your secure download link...'
          : 'Your download links are ready!';
      }
      if (progressBar) {
        var percent = ((total - secondsLeft) / total) * 100;
        progressBar.style.width = percent.toFixed(1) + '%';
      }
    }

    function reveal() {
      circle.classList.add('done');
      if (gate) gate.classList.add('hidden');
      links.classList.remove('hidden');
      links.classList.add('fade-in');
      if (fileName) {
        document.title = 'Download ' + (fileName.textContent || 'MOD APK') + ' - ModDongGam';
      }
      links.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    render(remaining);

    var timerId = window.setInterval(function () {
      remaining -= 1;
      render(remaining);
      if (remaining <= 0) {
        window.clearInterval(timerId);
        reveal();
      }
    }, 1000);
  }

  /* Warn before the user closes the tab while the gate is still running. */
  function initExitGuard() {
    if (!$('[data-download-gate]')) return;
    window.addEventListener('beforeunload', function (event) {
      if ($('[data-download-links]') && $('[data-download-links]').classList.contains('hidden')) {
        event.preventDefault();
        event.returnValue = '';
        return '';
      }
      return undefined;
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCountdown();
    initExitGuard();
  });
})();
