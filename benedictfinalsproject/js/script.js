/* Edit these details and project URLs before publishing. Empty URLs stay unavailable. */
const portfolio = {
  email: 'johnbenedict.deguzman378@email.lcup.edu.ph',
  github: '', // e.g. https://github.com/your-username
  resume: './assets/resume.pdf'
};

const projects = [
  { title: 'StudentHub', category: 'ANDROID APPLICATION', description: 'An Android student application designed to help organize schedules and student activities.', technologies: ['Kotlin', 'Android Studio', 'Database Integration'], illustration: 'student', github: '', demo: '' },
  { title: 'Computer Laboratory Monitoring System', category: 'DESKTOP APPLICATION', description: 'A Python-based system designed for student identification, laboratory monitoring, accountability, and real-time scheduling.', technologies: ['Python', 'Database', 'Student ID Authentication'], illustration: 'lab', github: '', demo: '' },
  { title: 'Personal Portfolio', category: 'WEB DEVELOPMENT', description: 'A responsive portfolio website showcasing my background, technical skills, and development projects.', technologies: ['HTML', 'CSS', 'JavaScript'], illustration: 'portfolio', github: '', demo: './' }
];

const icons = {
  github: '<svg class="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.3 11.3 0 0 0-3.57 22c.56.1.77-.24.77-.54v-2.1c-3.15.68-3.82-1.34-3.82-1.34-.51-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.39-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.16-3.05-.12-.29-.5-1.44.11-3 0 0 .95-.3 3.11 1.16a10.8 10.8 0 0 1 5.66 0c2.16-1.46 3.11-1.16 3.11-1.16.61 1.56.23 2.71.11 3 .72.8 1.16 1.81 1.16 3.05 0 4.35-2.66 5.31-5.19 5.59.41.36.77 1.04.77 2.1v3.1c0 .3.21.65.78.54A11.3 11.3 0 0 0 12 .8Z"/></svg>',
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
function validURL(value, allowLocal = false) {
  if (!value) return false;
  if (allowLocal && value.startsWith('./')) return true;
  try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; }
}
function externalLink(url, label) {
  const local = url.startsWith('./');
  return `<a href="${escapeHTML(url)}"${local ? '' : ' target="_blank" rel="noopener noreferrer"'}>${label}</a>`;
}

document.querySelectorAll('[data-social]').forEach(element => {
  const key = element.dataset.social;
  const label = 'GitHub';
  const content = `${icons[key]} <span class="social-label">${label} ↗</span>`;
  if (validURL(portfolio[key])) {
    element.innerHTML = externalLink(portfolio[key], content);
    element.querySelector('a').setAttribute('aria-label', `${label} profile (opens in a new tab)`);
  } else {
    element.innerHTML = `<span class="unavailable-social" title="${label} profile coming soon" aria-label="${label} profile coming soon">${content}</span>`;
  }
});

const illustrations = {
  student: '<div class="phone"><div class="phone-notch"></div><small>YOUR DAY, ORGANIZED</small><h4>StudentHub<span class="blue">.</span></h4><div class="phone-banner">Let’s make today count.<br><strong>Your class schedule</strong></div><div class="phone-lines"><i></i><i></i><i></i></div></div><div class="schedule-float"><b>✓</b> A little more organized.</div>',
  lab: '<div class="monitor"><div class="monitor-screen"><div class="mini-topbar"><span>▦ &nbsp; LAB MONITOR</span><span class="blue">● SYSTEM OVERVIEW</span></div><div class="mini-dashboard"><div class="mini-sidebar"></div><div class="mini-dashboard-content"><div class="mini-stats"><i></i><i></i><i></i></div><div class="mini-table"></div></div></div></div><div class="monitor-stand"></div></div>',
  portfolio: '<div class="mini-browser"><div class="mini-browser-top">● ● ●</div><div class="mini-portfolio"><div><small>HELLO, I’M</small><h4>Benedict<span class="blue">.</span></h4><p>Student. Builder. Problem solver.</p><span class="mini-button"></span></div><div class="mini-code">&lt;developer&gt;<br>&nbsp; create();<br>&lt;/developer&gt;</div></div></div>'
};
document.getElementById('project-grid').innerHTML = projects.map((project, index) => {
  const links = [];
  if (validURL(project.github)) links.push(externalLink(project.github, `${icons.github} &nbsp; GitHub ↗`));
  if (validURL(project.demo, true)) links.push(externalLink(project.demo, 'Live Demo ↗'));
  if (!links.length) links.push('<span class="unavailable">Repository &amp; demo links coming soon</span>');
  return `<article class="project-card reveal"><div class="project-visual ${project.illustration}" aria-hidden="true"><span class="project-number">0${index + 1}</span><span class="project-type">${project.category}</span>${illustrations[project.illustration]}</div><div class="project-body"><p class="project-category">${project.category}</p><h3>${escapeHTML(project.title)}</h3><p class="project-description">${escapeHTML(project.description)}</p><div class="tags">${project.technologies.map(technology => `<span>${escapeHTML(technology)}</span>`).join('')}</div><div class="project-links">${links.join('')}</div></div></article>`;
}).join('');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('nav-links');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.nav')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menuButton.focus(); }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const navLinks = [...navigation.querySelectorAll('a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
const backToTop = document.querySelector('.back-to-top');
let scrollPending = false;
function updateScroll() {
  let current = sections[0];
  for (const section of sections) { if (section.getBoundingClientRect().top <= 160) current = section; }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = sections[sections.length - 1];
  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current.id}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  backToTop.hidden = window.scrollY < 500;
  scrollPending = false;
}
window.addEventListener('scroll', () => { if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScroll); } }, { passive: true });
window.addEventListener('resize', updateScroll);
updateScroll();

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-reveal');
}

const emailLink = document.getElementById('email-link');
emailLink.href = `mailto:${portfolio.email}`;
emailLink.replaceChildren(document.createTextNode(`${portfolio.email} `));
const emailArrow = document.createElement('span');
emailArrow.textContent = '↗';
emailArrow.setAttribute('aria-hidden', 'true');
emailLink.append(emailArrow);
document.getElementById('copy-email').addEventListener('click', async () => {
  const status = document.getElementById('copy-status');
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(portfolio.email);
    } else {
      const input = document.createElement('textarea');
      input.value = portfolio.email;
      input.style.position = 'fixed'; input.style.opacity = '0';
      document.body.append(input); input.select();
      let copied = false;
      try { copied = document.execCommand('copy'); } finally { input.remove(); document.getElementById('copy-email').focus(); }
      if (!copied) throw new Error('Clipboard unavailable');
    }
    status.textContent = 'Email address copied to clipboard.';
  } catch { status.textContent = `Copy unavailable. Please select and copy: ${portfolio.email}`; }
});

// Keep both resume actions in sync with the editable asset path.
document.getElementById('resume-view').href = portfolio.resume;
document.getElementById('resume-download').href = portfolio.resume;
document.getElementById('year').textContent = new Date().getFullYear();
