let loader = document.getElementById("preloader");
let inputName;
let docUser;
let wishlistArray;
window.addEventListener("load", function () {
  loader.style.display = "none";
  loader.style.backgroundImage;
});

let delay = document.getElementById("links");

delay.style.display = "none";

document.querySelector("#show-login").addEventListener("click", () => {
  showLogin();
});

const btnShowPassword = document.getElementById("show-password-login");
const btnShowPasswordRegister = document.getElementById(
  "show-password-register"
);
const passwordField = document.getElementById("passwordInput");
const passwordResgisterField = document.getElementById("passwordRegistration");
const reenteredPasswordResgisterField = document.getElementById(
  "passwordRegistrationReenter"
);

btnShowPassword.onclick = function showPassword() {
  if (btnShowPassword.textContent == "Show Password") {
    passwordField.type = "text";
    btnShowPassword.textContent = "Hide Password";
  } else if (btnShowPassword.textContent == "Hide Password") {
    passwordField.type = "password";

    btnShowPassword.textContent = "Show Password";
  }
};

btnShowPasswordRegister.onclick = function showPassword() {
  if (btnShowPasswordRegister.textContent == "Show Password") {
    passwordResgisterField.type = "text";
    reenteredPasswordResgisterField.type = "text";
    btnShowPasswordRegister.textContent = "Hide Password";
  } else if (btnShowPasswordRegister.textContent == "Hide Password") {
    passwordResgisterField.type = "password";
    reenteredPasswordResgisterField.type = "password";
    btnShowPasswordRegister.textContent = "Show Password";
  }
};

const showLogin = () => {
  document.querySelector("#registration-page").classList.add("hide");
  document.querySelector("#login-page").classList.remove("hide");
  document.querySelector("#homepage").classList.add("hide");
};

document.querySelector("#show-register").addEventListener("click", () => {
  showRegistration();
});

const showRegistration = () => {
  document.querySelector("#registration-page").classList.remove("hide");
  document.querySelector("#login-page").classList.add("hide");
  document.querySelector("#homepage").classList.add("hide");
};

const firebaseConfig = {
  apiKey: "AIzaSyBTybQQFIAfYP-k8_2ecjBcjqkKR_rbih8",
  authDomain: "bibl-project.firebaseapp.com",
  projectId: "bibl-project",
  storageBucket: "bibl-project.appspot.com",
  messagingSenderId: "38262289068",
  appId: "1:38262289068:web:ce2dc464858a691f7ae509",
  measurementId: "G-ZGYJG9V6S7",
};

const app = firebase.initializeApp(firebaseConfig);

let database = app.firestore();

document.getElementById("login-btn").onclick = async function loginFunction() {
  inputName = document.getElementById("usernameInput").value;
  localStorage.setItem("inputName", JSON.stringify(inputName));
  console.log(document.getElementById("usernameInput").value);
  let inputPassword = document.getElementById("passwordInput").value;
  let check = false;

  await database
    .collection("Users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (
          doc.data().name === inputName &&
          doc.data().password === inputPassword
        ) {
          check = true;
          docUser = doc.id;
          wishlistArray = doc.data().wishlist;
        }
      });
    });
  if (check === true) {
    window.location.href = "MainPage.html";
  } else {
    alert("Incorrect username or password! \nPlease try again!");
  }
  localStorage.setItem("docUser", JSON.stringify(docUser));
  // localStorage.setItem("wishlistArray", JSON.stringify(wishlistArray));
};

document.getElementById("register-btn").onclick =
  async function registerFunction() {
    inputName = document.getElementById("usernameRegistration").value;
    let inputPassword = document.getElementById("passwordRegistration").value;
    let inputPasswordReenter = document.getElementById(
      "passwordRegistrationReenter"
    ).value;
    let usernameExists = false;

    await database
      .collection("Users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().name === inputName) {
            usernameExists = true;
          }
        });
      });

    if (document.getElementById("usernameRegistration").value.length != 0) {
      if (inputPassword.length > 7) {
        if (inputPasswordReenter === inputPassword) {
          if (usernameExists === true) {
            alert("Username already taken!");
          } else if (usernameExists === false) {
            let user = {
              name: inputName,
              password: inputPassword,
              wishlist: "",
            };

            await database.collection("Users").add(user);
            alert("You have succesfully signed up");

            window.location.href = "LoginPage.html";
          }
        } else {
          alert(
            "Conformation password does not match password!\nPlease try again!"
          );
        }
      } else {
        alert("Password must contain at least 8 characters!");
      }
    } else {
      alert("You must enter a username!");
    }
  };
