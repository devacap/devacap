document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");

year.textContent = new Date().getFullYear();

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

window.addEventListener("load", () => {
  const target = window.location.hash
    ? document.querySelector(window.location.hash)
    : null;

  if (target) {
    document.documentElement.style.scrollBehavior = "auto";
    target.scrollIntoView();
    document.documentElement.style.scrollBehavior = "";
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  });
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    formStatus.textContent = "Completa i campi richiesti per continuare.";
    return;
  }

  formStatus.textContent = "Grazie! La tua richiesta è stata inviata.";
  contactForm.reset();
});
