// Project Data - Your Real Projects
const projects = [
    {
        id: 1,
        title: "Apex Athletic",
        description: "Modern athletic brand e-commerce platform featuring product showcase, multilingual support (English/Albanian), and user authentication system for a professional shopping experience.",
        image: "Projects/Apex-Athletic/Preview.png",
        url: "https://apex-athletic.vercel.app/",
        tag: "E-Commerce"
    },
    {
        id: 2,
        title: "Limani Studio",
        description: "Professional photography and video production portfolio. Showcases wedding photography, event coverage, and creative production services with a sleek, elegant design.",
        image: "Projects/Foto Producent Limani/image.png",
        url: "https://foto-limani.netlify.app/",
        tag: "Photography"
    },
    {
        id: 3,
        title: "SUVATIMI-H",
        description: "Professional facade and exterior renovation services website. Features project gallery, service descriptions, supplier information, and bilingual interface (English/Albanian).",
        image: "Projects/SUVATIMI-H/images/Preview.png",
        url: "https://suvatimi.vercel.app/",
        tag: "Business"
    },
    {
        id: 4,
        title: "Nordwall Studio",
        description: "Nordwall Studio is a modern creative web studio focused on building sleek, responsive, and visually engaging digital experiences. The website showcases clean design, smooth animations, and professional development work tailored for brands, startups, and businesses looking to strengthen their online presence.",
        image: "Projects/Nordwall/Preview.png",
        url: "https://nordwall-studio.vercel.app/",
        tag: "Business"
    },
    {
        id: 5,
        title: "Nissi Barber Shop",
        description: "Professional barber shop website showcasing services, gallery, and booking information. Clean, modern design tailored for a salon business.",
        image: "Projects/nissi-barber-shop/Preview.png",
        url: "https://barbershop-nissi.vercel.app/",
        tag: "Barber Shop"
    }
];

// DOM Elements
const projectsContainer = document.getElementById('projectsContainer');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.close');

// Initialize Projects
function initializeProjects() {
    renderProjects();
    attachEventListeners();
}

// Render Projects to Grid
function renderProjects() {
    projectsContainer.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProjectModal(${project.id})">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <span class="project-tag">${project.tag}</span>
            </div>
        </div>
    `).join('');
}

// Open Modal with Project Details
function openProjectModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modalImage').src = project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDescription').textContent = project.description;
    document.getElementById('modalLink').href = project.url;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close Modal
function closeProjectModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Attach Event Listeners
function attachEventListeners() {
    closeBtn.onclick = closeProjectModal;

    window.onclick = function(event) {
        if (event.target === modal) {
            closeProjectModal();
        }
    }

    // Close on Escape Key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeProjectModal();
        }
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', initializeProjects);
