document.querySelector('.hamburger').addEventListener('click', function() {
  document.querySelector('.nav-links').classList.toggle('expanded');
  this.classList.toggle('active');
});


