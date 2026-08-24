document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navBackdrop = document.querySelector('.nav-backdrop');
  const header = document.querySelector('.site-header');

  const closeMenu = () => {
    navLinks.classList.remove('open');
    menuToggle.classList.remove('open');
    if (navBackdrop) {
      navBackdrop.classList.remove('open');
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.classList.toggle('open', isOpen);
      if (navBackdrop) {
        navBackdrop.classList.toggle('open', isOpen);
      }
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeMenu);
    }
  }

  document.querySelectorAll('.project-card').forEach(card => {
    const projectName = card.querySelector('.project-card-front h3');
    if (projectName) {
      card.setAttribute('aria-label', `Show details for ${projectName.textContent}`);
    }

    const toggleCard = () => {
      const isOpen = card.classList.toggle('open');
      card.setAttribute('aria-expanded', String(isOpen));
      card.setAttribute('aria-label', `${isOpen ? 'Hide' : 'Show'} details for ${projectName ? projectName.textContent : 'project'}`);
    };

    card.addEventListener('click', (event) => {
      const anchor = event.target.closest('a');
      if (!anchor) {
        toggleCard();
      }
    });

    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleCard();
      }
    });
  });

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 16) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    };

    onScroll();
    window.addEventListener('scroll', onScroll);
  }
});
