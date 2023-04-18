const closeBtn = document.querySelector("#close-btn");
const openBtn = document.querySelector("#open-btn");
const navigation = document.querySelector("#navigation");

closeBtn.addEventListener("click", () => {
  navigation.classList.toggle("active");
  closeBtn.style.display = "none";
  openBtn.style.display = "block";
  console.log("click");
});

openBtn.addEventListener("click", () => {
  navigation.classList.toggle("active");
  openBtn.style.display = "none";
  closeBtn.style.display = "block";
});

// Open Dev-info form

const openForm = document.getElementById("open-dev-data-from-btn");
const devDataForm = document.getElementById("add-dev-data-from");
const chevron = document.querySelector(".chevron");
const plus = document.querySelector(".plus-btn");

openForm.addEventListener("click", () => {
  devDataForm.style.display =
    devDataForm.style.display === "none" ? "block" : "none";

  chevron.style.display = chevron.style.display === "none" ? "inline" : "none";
  plus.style.display = plus.style.display === "inline" ? "none" : "inline";
});
