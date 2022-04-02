document.querySelector("#show-login").addEventListener("click", () => {
  showLogin();
});

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
  console.log("???");
  let inputName = document.getElementById("usernameInput").value;
  console.log(document.getElementById("usernameInput").value);
  let inputPassword = document.getElementById("passwordInput").value;
  let check = false;

  await database
    .collection("Users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(inputPassword);
        if (
          doc.data().name === inputName &&
          doc.data().password === inputPassword
        ) {
          check = true;
          let string = doc.data().name;
          alert(string);
        }
      });
    });
  if (check === true) {
    alert("postoji");
    window.location.href = "MainPage.html";
  } else {
    alert("krivo ime ili lozinka");
  }
};

document.getElementById("register-btn").onclick = async function registerFunction() {

    let inputName = document.getElementById("usernameRegistration").value;
    let inputPassword = document.getElementById("passwordRegistration").value;
    let inputPasswordReenter=document.getElementById("passwordRegistrationReenter").value;
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

  if (inputPasswordReenter === inputPassword) {

    if (usernameExists === true) {
      alert("Ime već postoji");
    }

    else if (usernameExists === false) {

      let user = {
        name: inputName,
        password: inputPassword,
      };
      

      database.collection("Users").add({

        name: inputName,
        password: inputPassword,

      });

      alert("Uspjesna registracija");

      window.location.href = "MainPage.html";
    }
  }
  else {
    alert("Pogrešno ste unijeli drugi password")
  }
  };