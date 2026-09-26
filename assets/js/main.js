/* ==========================================================================
   ModDongGam - main.js
   Shared behaviour for every page: mobile nav, footer year, live game search.
   Vanilla JavaScript, no dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------- utils */
  function $(selector, scope) {
    return (scope || document).querySelector(selector);
  }
  function $$(selector, scope) {
    return Array.prototype.slice.call((scope || document).querySelectorAll(selector));
  }

  /* ------------------------------------------------------------ mobile nav */
  function initMobileNav() {
    var toggle = $('.nav-toggle');
    var nav = $('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close the menu when a link is picked (nice on mobile).
    $$('a', nav).forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------- footer year */
  function initYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ------------------------------------------------------- game search/filter
     Works in two modes:
       1. index.html  -> filters the .game-card elements live
       2. other pages -> submits a redirect back to index.html?q=...
     ---------------------------------------------------------------------- */
  function normalize(text) {
    return (text || '').toString().toLowerCase().trim();
  }

  function initSearch() {
    var form = $('[data-search-form]');
    var input = $('[data-search-input]');
    var cards = $$('[data-game-card]');
    var emptyState = $('[data-empty-state]');
    var counter = $('[data-game-count]');

    var params = new URLSearchParams(window.location.search);
    var initialQuery = params.get('q') || '';

    function applyFilter(query) {
      var q = normalize(query);
      var visible = 0;

      cards.forEach(function (card) {
        var haystack = normalize(
          card.getAttribute('data-title') + ' ' + card.getAttribute('data-tags')
        );
        var match = q === '' || haystack.indexOf(q) !== -1;
        card.classList.toggle('hidden', !match);
        if (match) visible++;
      });

      if (emptyState) emptyState.classList.toggle('hidden', visible !== 0);
      if (counter) counter.textContent = visible + (visible === 1 ? ' game' : ' games');
      return visible;
    }

    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var value = input ? input.value : '';

        if (cards.length) {
          applyFilter(value);
          var url = new URL(window.location.href);
          if (normalize(value)) url.searchParams.set('q', value);
          else url.searchParams.delete('q');
          window.history.replaceState({}, '', url.toString());
        } else {
          window.location.href = 'index.html?q=' + encodeURIComponent(value);
        }
      });
    }

    if (input) {
      input.addEventListener('input', function () {
        if (cards.length) applyFilter(input.value);
      });

      if (initialQuery) {
        input.value = initialQuery;
        if (cards.length) applyFilter(initialQuery);
      }
    }
  }

  /* ---------------------------------------------------------- sidebar links */
  function initSidebarFilters() {
    var links = $$('[data-filter]');
    if (!links.length) return;

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var value = link.getAttribute('data-filter');
        var input = $('[data-search-input]');
        if (!input) return;
        event.preventDefault();
        input.value = value === '*' ? '' : value;
        var form = $('[data-search-form]');
        if (form) form.dispatchEvent(new Event('submit', { cancelable: true }));
        if (!form && input) input.dispatchEvent(new Event('input'));
      });
    });
  }

  /* ------------------------------------------------------------------ boot */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initYear();
    initSearch();
    initSidebarFilters();
  });
})();
