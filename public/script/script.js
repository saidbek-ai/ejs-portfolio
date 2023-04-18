// Navigation bar
const navLinks = document.querySelectorAll(".nav-link");
const pages = document.querySelectorAll(".page");

// Page Changer
function clearActivePageClass(pages) {
  pages.forEach((page) => {
    page.classList.remove("active-page");
  });
}

function clearActiveNavBtn(navlinks) {
  navlinks.forEach((link) => {
    link.classList.remove("active");
  });
}

function handleNavLinks() {
  clearActivePageClass(pages);
  pages.forEach((page) => {
    if (page.id === this.id.split("-")[0]) {
      page.classList.add("active-page");
    }
  });

  clearActiveNavBtn(navLinks);
  this.classList.add("active");
}

navLinks.forEach((link) => {
  link.addEventListener("click", handleNavLinks);
});

//Welcome text
const greetingText = document.querySelector("#welcome-text");

let time = new Date().getHours();
let greeting;
if (time < 6) {
  greeting = "Hayli Kech";
} else if (time > 6 && time < 12) {
  greeting = "Hayrli Tong";
} else if (time > 12 && time < 18) {
  greeting = "Hayrli Kun";
} else if (time > 18 && time < 24) {
  greeting = "Hayrli Kech";
} else {
  greeting = "Salom";
}

greetingText.textContent = `${greeting}! `;

// Home btn
const heroBtn = document.getElementById("hero-btn");
const projectPage = document.querySelector(".project");
const projectNavBtn = document.getElementById("project-link");

heroBtn.addEventListener("click", () => {
  clearActivePageClass(pages);
  clearActiveNavBtn(navLinks);
  projectNavBtn.classList.add("active");
  projectPage.classList.add("active-page");
});

//Pricing Btns

const pricingBtns = document.querySelectorAll(".pricing-card-link");
const contactPage = document.querySelector(".contact");
const contactNavBtn = document.getElementById("contact-link");

pricingBtns.forEach((pb) => {
  pb.addEventListener("click", () => {
    clearActivePageClass(pages);
    clearActiveNavBtn(navLinks);
    contactNavBtn.classList.add("active");
    contactPage.classList.add("active-page");
  });
});

// faq accordion

// const acc = document.getElementsByClassName("accordion");

// for (let i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {
//     this.classList.toggle("active");
//     let panel = this.nextElementSibling;
//     panel.style.display === "block"
//       ? (panel.style.display = "none")
//       : (panel.style.display = "block");
//   });
// }

//Rendering Footer text
const footerText = document.querySelector("#footer-text");
footerText.textContent = `© Copyright STX ${new Date().getFullYear()} || Barcha huquqlar himoyalangan!`;
