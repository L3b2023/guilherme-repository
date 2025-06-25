// script.js
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  if (body.classList.contains('dark')) {
    themeIcon.classList.replace('fa-moon', 'fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.classList.replace('fa-sun', 'fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Fade-in all sections after button click
document.getElementById('view-work-btn')?.addEventListener('click', function (e) {
  e.preventDefault();

  const sections = ['projects', 'about', 'contact', 'footer'];

  sections.forEach((id, index) => {
    const section = document.getElementById(id);
    if (section) {
      setTimeout(() => {
        section.classList.remove('hidden');
        section.classList.add('animate-fade-in', `delay-${index + 1}`);
      }, index * 100); // subtle stagger
    }
  });

  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
});

// Smooth scroll for all internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Fetch projects
const projectsContainer = document.getElementById('projects-container');

fetch('projects.json')
  .then(response => response.json())
  .then(projects => {
    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add(
        'bg-white', 'dark:bg-gray-700', 'rounded-lg', 'shadow-lg', 
        'overflow-hidden', 'transform', 'transition', 'duration-300', 'hover:scale-105',
        'p-6' // adiciona padding no card
      );
      projectCard.innerHTML = `
        <h3 class="text-2xl font-semibold mb-2">${project.title}</h3>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-4">${project.description}</p>
        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="inline-block px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
          View Project
        </a>
      `;
      projectsContainer.appendChild(projectCard);
    });
  })
  .catch(error => console.error('Error loading projects:', error));
