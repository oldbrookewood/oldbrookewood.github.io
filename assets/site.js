/* ============================================================
   OLD BROOKEWOOD CAPITAL — site.js
   Features: mobile nav toggle + optional reveal-on-scroll
   No external dependencies.
   ============================================================ */

(function () {
  'use strict';

  /* ---- Mobile menu toggle ---- */
  var btn  = document.getElementById('menu-btn');
  var nav  = document.getElementById('site-nav');

  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !btn.contains(e.target)) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', 'Open menu');
      }
    });

    // Close on nav link click (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Reveal on scroll (respects prefers-reduced-motion) ---- */
  var prefersReduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll('.reveal');

    if (targets.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });

      targets.forEach(function (el) {
        observer.observe(el);
      });
    }
  } else {
    // If reduced motion or no IO support, make all visible immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();