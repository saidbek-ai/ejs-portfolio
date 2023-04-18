//Login-register
const loginBtn = document.querySelector("#login-passBtn");
const loginPassInput = document.querySelector("#password");

const registerPassBtn = document.querySelector("#register-pass-btn");
const registerPassInp = document.querySelector("#reg-password");

const registerConfirmPassBtn = document.querySelector(
  "#register-confirmPass-btn"
);
const registerConfirmPassInp = document.querySelector("#confirmPassword");

function togglePassShow(passBtn, passInp) {
  passBtn.addEventListener("click", () => {
    passInp.type = passInp.type === "password" ? "text" : "password";
  });
}

togglePassShow(loginBtn, loginPassInput);
togglePassShow(registerPassBtn, registerPassInp);
togglePassShow(registerConfirmPassBtn, registerConfirmPassInp);
