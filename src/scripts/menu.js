document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const menuItems = navLinks.querySelectorAll('a');

  function setMenuTabIndex(tabIndex) {
    menuItems.forEach(item => item.tabIndex = tabIndex);
  }

  function toggleMenu() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('expanded');

    if (isExpanded) {
      // Menu is being closed
      setMenuTabIndex(-1); // Make menu items unfocusable
    } else {
      // Menu is being opened
      setMenuTabIndex(0); // Make menu items focusable
    }
  }

  // Initially set menu items as unfocusable
  setMenuTabIndex(-1);

  hamburger.addEventListener('click', toggleMenu);

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Handle tabbing through menu items
  const lastMenuItem = menuItems[menuItems.length - 1];
  lastMenuItem.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      hamburger.focus();
    }
  });

  hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey && navLinks.classList.contains('expanded')) {
      e.preventDefault();
      lastMenuItem.focus();
    }
  });

  // Close menu when Escape is pressed
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('expanded')) {
      toggleMenu();
      hamburger.focus();
    }
  });

  // Optionally, close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('expanded') && !navLinks.contains(e.target) && e.target !== hamburger) {
      toggleMenu();
    }
  });
});