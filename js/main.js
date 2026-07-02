document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Highlight active nav link based on current page
  var path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
  });

  // Newsletter / contact form demo submit
  document.querySelectorAll('form[data-demo-form]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Thank you!';
        setTimeout(function () { btn.textContent = original; form.reset(); }, 2200);
      }
    });
  });

  // Scroll reveal animation for sections and card grids
  if ('IntersectionObserver' in window) {
    var revealTargets = document.querySelectorAll(
      '.section, .cta-banner, .leaders-strip, .partners-strip'
    );
    var staggerGrids = document.querySelectorAll(
      '.officials-grid, .news-grid, .dept-icon-grid, .barangay-grid, .services-directory, .stat-grid, .quicklinks-grid, .gallery-grid'
    );

    revealTargets.forEach(function (el) { el.classList.add('reveal'); });
    staggerGrids.forEach(function (el) { el.classList.add('reveal-stagger'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealTargets.forEach(function (el) { io.observe(el); });
    staggerGrids.forEach(function (el) { io.observe(el); });
  }
});
