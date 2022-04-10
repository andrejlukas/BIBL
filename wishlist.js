let mybutton = document.getElementById("btn-back-to-top");

var UserName = JSON.parse(localStorage.getItem("inputName"));
console.log(UserName);
let Wishlist;

// Kada user scrolla dole 20px pokaže se button 
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// Kada user pritisne button, vrati se na početak documenta
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

getWishlist();

//dohvaća se wishlist iz firebasea i ispisuje 
async function getWishlist() {
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

  await database
    .collection("Users")
    .where("name", "==", UserName)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        Wishlist = doc.data().wishlist.toString();
      });
    });

  if (Wishlist != "") {
    let wishlistArr = Wishlist.split("|");

    for (i = 1; i < wishlistArr.length; i++) {
      let cardWishlist = wishlistArr[i].split("*");

      document.getElementById("wishlist-results").innerHTML += `<br><br>
    <div  class="col-12 col-md-6 col-lg-4 mt-5 mb-5 " >
      <div class="card mb-3" style="width: 18rem;">
      <img class="img-fluid rounded-start"  src='${cardWishlist[5]}' alt="No picture">
      <div class="card-body">
    <h5 class="card-title"  >${cardWishlist[0]}</h5>
    <p class="card-text" >Author: ${cardWishlist[1]}</p>
    <p class="card-text" ">Publisher: ${cardWishlist[2]}</p>
    <p class="card-text" >Page Count: ${cardWishlist[3]}</p>
    <p class="card-text" >Maturity Rating: ${cardWishlist[4]}</p>
    <a  class="btn btn-primary"  href="${cardWishlist[6]}" target="_blank">See book</a>
  </div>
</div>
</div>
<br>

  `;
    }
  }
}
