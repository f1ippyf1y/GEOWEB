document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Search modal ---------- */
  const searchToggle = document.getElementById('searchToggle');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');

  function openSearch() {
    searchModal.setAttribute('aria-hidden', 'false');
    searchModal.querySelector('input').focus();
  }
  function closeSearch() { searchModal.setAttribute('aria-hidden', 'true'); }

  if (searchToggle && searchModal) {
    searchToggle.addEventListener('click', openSearch);
    searchClose.addEventListener('click', closeSearch);
    searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearch(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });
  }

  /* ---------- Mobile menu ---------- */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuClose = document.getElementById('menuClose');

  function openMenu() { mobileMenu.setAttribute('aria-hidden', 'false'); }
  function closeMenu() { mobileMenu.setAttribute('aria-hidden', 'true'); }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  }

  /* ---------- Mark active nav link ---------- */
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a, .mobile-menu-content a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) link.classList.add('is-active');
  });

  /* ---------- Reveal-on-scroll (applies site-wide) ---------- */
  const revealTargets = document.querySelectorAll('.grid-item, .reveal, .gallery-frame, .story-body p');
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- Sticky header: condense + hide on scroll down ---------- */
  const header = document.getElementById('siteHeader');
  let lastScroll = 0;

  if (header) {
    window.addEventListener('scroll', () => {
      const current = window.pageYOffset;
      header.classList.toggle('is-condensed', current > 60);
      if (current > lastScroll && current > 160) {
        header.classList.add('is-hidden');
      } else {
        header.classList.remove('is-hidden');
      }
      lastScroll = current;
    }, { passive: true });
  }

  /* ---------- Scroll progress bar ---------- */
  const progress = document.querySelector('.scroll-progress');
  if (progress) {
    window.addEventListener('scroll', () => {
      const h = document.documentElement;
      const scrollPercent = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
      progress.style.width = scrollPercent + '%';
    }, { passive: true });
  }

  /* ---------- Lightbox for portfolio galleries ---------- */
  const galleryFrames = document.querySelectorAll('.gallery-frame');
  const lightbox = document.getElementById('lightbox');

  if (galleryFrames.length && lightbox) {
    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');
    const lbClose = lightbox.querySelector('.lightbox-close');
    const lbPrev = lightbox.querySelector('.lightbox-prev');
    const lbNext = lightbox.querySelector('.lightbox-next');
    let currentIndex = 0;

    function showImage(index) {
      currentIndex = (index + galleryFrames.length) % galleryFrames.length;
      const frame = galleryFrames[currentIndex];
      const fullSrc = frame.dataset.full || frame.querySelector('img').src;
      const caption = frame.dataset.caption || '';
      lbImg.src = fullSrc;
      lbImg.alt = frame.querySelector('img').alt || '';
      lbCaption.textContent = caption;
    }

    galleryFrames.forEach((frame, i) => {
      frame.addEventListener('click', () => {
        showImage(i);
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    function closeLightbox() { lightbox.setAttribute('aria-hidden', 'true'); }

    lbClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    lbPrev.addEventListener('click', () => showImage(currentIndex - 1));
    lbNext.addEventListener('click', () => showImage(currentIndex + 1));

    document.addEventListener('keydown', (e) => {
      if (lightbox.getAttribute('aria-hidden') === 'false') {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
      }
    });
  }

  /* ---------- Card lift on hover (grid items) ---------- */
  document.querySelectorAll('.grid-item').forEach((item) => {
    item.addEventListener('mouseenter', function () {
      this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      this.style.transform = 'translateY(-4px)';
    });
    item.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });

  /* ---------- Newsletter form (front-end only stub) ---------- */
  document.querySelectorAll('.newsletter-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      const original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      input.value = '';
      setTimeout(() => { btn.textContent = original; }, 2200);
    });
  });

  /* ---------- Cart count stub ---------- */
  function updateCartCount(count) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) cartCount.textContent = count;
  }
  updateCartCount(0);
});
