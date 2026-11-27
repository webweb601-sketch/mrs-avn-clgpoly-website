// MRS. AVN Polytechnic College website interactions
const branchContent = {
  cse: {
    title: "Computer Science and Engineering (CSE)",
    intro: "CSE introduces students to computing systems, software development and the principles behind digital applications. Learners build logical thinking and learn how computer systems solve information-processing problems.",
    subjects: ["Programming fundamentals", "Computer systems and operating concepts", "Data structures and databases", "Web technologies and networking basics"],
    practical: "Practice may include writing and testing programs, using development tools, creating simple web or database projects, and learning basic troubleshooting in a computer lab.",
    careers: "Potential pathways include junior software or web development, IT support, testing, computer operations and further study in computing. Career options depend on skills, experience and additional qualifications."
  },
  aiml: {
    title: "Artificial Intelligence and Machine Learning (AIML)",
    intro: "AIML explores how computer systems can use data and algorithms to identify patterns, make predictions and support intelligent applications. It combines computing fundamentals with introductory AI concepts.",
    subjects: ["Programming and computational thinking", "Mathematics and data fundamentals", "Introduction to artificial intelligence", "Machine learning concepts and data handling"],
    practical: "Learning activities can include data preparation, basic algorithm experiments, small prediction exercises and exploring AI tools responsibly. The depth of topics depends on the approved curriculum.",
    careers: "Possible directions include AI or data support roles, junior programming, automation support and continued study in AI, data science or computer science. Advanced roles generally require further learning."
  },
  ece: {
    title: "Electronics and Communication Engineering (ECE)",
    intro: "ECE covers electronic components, circuits and the systems used to transmit and receive information. Students explore the relationship between electronics, signals and communication technologies.",
    subjects: ["Electronic components and circuit fundamentals", "Digital electronics", "Communication systems", "Measurements and basic embedded concepts"],
    practical: "Practical work may include circuit assembly, component identification, measurements, signal demonstrations and supervised experiments with electronic instruments.",
    careers: "Potential pathways include electronics technician, communication equipment support, testing and service roles, with opportunities for further study in electronics, communication or embedded systems."
  },
  eee: {
    title: "Electrical and Electronics Engineering (EEE)",
    intro: "EEE introduces electrical energy, circuits, electrical machines and the systems used to generate, distribute and use electrical power. It also connects electrical principles with electronic control.",
    subjects: ["Electrical circuit fundamentals", "Electrical machines", "Power generation and distribution basics", "Electrical measurements and control concepts"],
    practical: "Learning may involve circuit measurements, electrical machine demonstrations, wiring principles and supervised laboratory exercises with attention to electrical safety.",
    careers: "Possible pathways include electrical technician, maintenance support, electrical installation and testing roles, or further study in electrical engineering and related fields."
  },
  civil: {
    title: "Civil Engineering",
    intro: "Civil Engineering focuses on the planning, design, construction and maintenance of the built environment, including buildings, roads, water systems and other infrastructure.",
    subjects: ["Engineering drawing", "Construction materials and methods", "Surveying fundamentals", "Structural and concrete technology basics"],
    practical: "Practical learning may include drawing exercises, surveying demonstrations, material testing, estimation and supervised site or model-based activities.",
    careers: "Potential pathways include site or construction technician, surveying assistant, drafting support, estimation assistant and further study in civil engineering."
  },
  mechanical: {
    title: "Mechanical Engineering",
    intro: "Mechanical Engineering studies machines, motion, energy, materials and manufacturing processes. Students learn how mechanical systems are designed, produced, operated and maintained.",
    subjects: ["Engineering mechanics", "Manufacturing processes", "Thermal engineering fundamentals", "Machine drawing and materials"],
    practical: "Learning may include workshop practice, engineering drawing, measurement, machining demonstrations, materials study and supervised maintenance-related exercises.",
    careers: "Potential pathways include production or maintenance technician, manufacturing support, quality inspection, CAD drafting and further study in mechanical engineering."
  }
};
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Highlight the current section in the navigation.
const navLinks = [...nav.querySelectorAll('a[href^="#"]')];
const observedSections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  observedSections.forEach(section => sectionObserver.observe(section));
}

// Department details panel.
const detailPanel = document.getElementById("branch-detail");
const detailTitle = document.getElementById("detail-title");
const detailIntro = document.getElementById("detail-intro");
const detailSubjects = document.getElementById("detail-subjects");
const detailPractical = document.getElementById("detail-practical");
const detailCareers = document.getElementById("detail-careers");
const detailButtons = [...document.querySelectorAll(".details-btn")];

function closeBranchDetails() {
  detailPanel.hidden = true;
  detailButtons.forEach(button => {
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = 'View Details <span>↗</span>';
  });
}

detailButtons.forEach(button => {
  button.addEventListener("click", () => {
    const branch = branchContent[button.dataset.branch];
    const isSameOpen = !detailPanel.hidden && button.getAttribute("aria-expanded") === "true";
    closeBranchDetails();
    if (isSameOpen) return;

    detailTitle.textContent = branch.title;
    detailIntro.textContent = branch.intro;
    detailPractical.textContent = branch.practical;
    detailCareers.textContent = branch.careers;
    detailSubjects.replaceChildren();
    branch.subjects.forEach(subject => {
      const li = document.createElement("li");
      li.textContent = subject;
      detailSubjects.appendChild(li);
    });
    detailPanel.hidden = false;
    button.setAttribute("aria-expanded", "true");
    button.innerHTML = 'Hide Details <span>−</span>';
    detailPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

document.querySelector(".detail-close").addEventListener("click", closeBranchDetails);

// Image gallery lightbox with previous/next controls.
const galleryItems = [...document.querySelectorAll(".gallery-item[data-image]")];
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
let currentImageIndex = 0;
let lastFocusedElement = null;

function showImage(index) {
  currentImageIndex = (index + galleryItems.length) % galleryItems.length;
  const item = galleryItems[currentImageIndex];
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector("img")?.alt || item.dataset.caption || "College photograph";
  lightboxCaption.textContent = item.dataset.caption || item.querySelector("img")?.alt || "";
}

function openLightbox(index) {
  lastFocusedElement = document.activeElement;
  showImage(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightbox.querySelector(".lightbox-close").focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  if (lastFocusedElement) lastFocusedElement.focus();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openLightbox(index));
});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showImage(currentImageIndex - 1));
lightbox.querySelector(".lightbox-next").addEventListener("click", () => showImage(currentImageIndex + 1));
lightbox.addEventListener("click", event => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", event => {
  if (lightbox.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") showImage(currentImageIndex - 1);
  if (event.key === "ArrowRight") showImage(currentImageIndex + 1);
});

// Front-end form validation. No backend is connected.
const enquiryForm = document.getElementById("enquiry-form");
const formMessage = document.getElementById("form-message");

enquiryForm.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.className = "form-note";

  if (!enquiryForm.checkValidity()) {
    enquiryForm.reportValidity();
    formMessage.textContent = "Please check the fields and complete the enquiry form correctly.";
    formMessage.classList.add("error");
    return;
  }

  formMessage.textContent = "Your form is valid. This demo does not send or store your enquiry; connect an approved form service or backend to receive submissions.";
  formMessage.classList.add("success");
});

// Back-to-top visibility and current year.
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("visible", window.scrollY > 450);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.getElementById("year").textContent = new Date().getFullYear();
