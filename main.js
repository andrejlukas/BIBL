//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
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
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let placeHolder = `<img src="https://via.placeholder.com/150">`;

let item, title, author, bookImage, publisher, pageCount, maturityRating, link;
let numOfBooks = 0;
var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
let tempArray = [];
let Wishlist;

document.getElementById("search-by-title").onclick = function SearchByTitle() {
  let baseTitleUrl = "https://www.googleapis.com/books/v1/volumes?q=";
  let title = document.getElementById("search-box-title").value;
  if (title === "" || title === null) {
    alert("You must enter a search term!");
  } else {
    $.ajax({
      url: baseTitleUrl + title,
      datatype: "json",
      success: function (response) {
        console.log(response);
        if (response.totalItems === 0) {
          document.getElementById("results").innerHTML =
            "<center><h4 id='noGoodResults'>Looks like there are no good results for your search :(</h4><center>";
        } else {
          displayResults(response);
        }
      },
      error: function ErrorTitleResponse() {
        alert("Something went wrong\nPlease try again");
      },
    });
  }
  document.getElementById("search-box-title").value = "";
};
var userName = JSON.parse(localStorage.getItem("inputName"));
console.log(userName);

var userdoc = JSON.parse(localStorage.getItem("docUser"));
console.log(userdoc);

var wishlistArray = JSON.stringify(localStorage.getItem("wishlistArray"));
console.log(wishlistArray);

function displayResults(response) {
  document.getElementById("results").innerHTML = "";
  for (let i = 0; i < response.items.length; i++) {
    item = response.items[i];

    title = item.volumeInfo.title;
    if (item.volumeInfo.authors == null) {
      author = "/";
    } else {
      author = item.volumeInfo.authors;
    }
    if (item.volumeInfo.publisher == null) {
      publisher = "/";
    } else {
      publisher = item.volumeInfo.publisher;
    }

    if (item.volumeInfo.pageCount == null) {
      pageCount = "/";
    } else {
      pageCount = item.volumeInfo.pageCount;
    }

    maturityRating = item.volumeInfo.maturityRating;
    link = item.volumeInfo.canonicalVolumeLink;

    bookImage = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.thumbnail
      : placeHolder;
    numOfBooks = i;

    let tempItem = {
      title,
      author,
      publisher,
      pageCount,
      maturityRating,
      bookImage,
      link,
    };

    tempArray.push(tempItem);
    document.getElementById("results").innerHTML += `<br><br>
    <div  class="col-12 col-md-6 col-lg-4 mt-5 mb-5 " >
      <div class="card mb-3" style="width: 18rem;">
      <img class="img-fluid rounded-start" id="bookImage-${i}" src='${bookImage}' alt="No picture">
      <div class="card-body">
    <h5 class="card-title" id="title-${i}" >${title}</h5>
    <p class="card-text" id="author-${i}">Author: ${author}</p>
    <p class="card-text" id="publisher-${i}">Publisher: ${publisher}</p>
    <p class="card-text" id="pageCount-${i}">Page Count: ${pageCount}</p>
    <p class="card-text" id="maturityRating-${i}">Maturity Rating: ${maturityRating}</p>
    <a  class="btn btn-primary" id="wishlist-${i}">Add to whishlist</a>
    <a  class="btn btn-primary" id="link-${i}" href="${link}" target="_blank">See book</a>
  </div>
</div>
</div>
<br>

  `;
  }

  document.getElementById("wishlist-0").onclick = function () {
    alert("oce kurac");
    AddToWishlist(0);
  };
  document.getElementById("wishlist-1").onclick = function () {
    AddToWishlist(1);
  };
  document.getElementById("wishlist-2").onclick = function () {
    AddToWishlist(2);
  };
  document.getElementById("wishlist-3").onclick = function () {
    AddToWishlist(3);
  };
  document.getElementById("wishlist-4").onclick = function () {
    AddToWishlist(4);
  };
  document.getElementById("wishlist-5").onclick = function () {
    AddToWishlist(5);
  };
  document.getElementById("wishlist-6").onclick = function () {
    AddToWishlist(6);
  };
  document.getElementById("wishlist-7").onclick = function () {
    AddToWishlist(7);
  };
  document.getElementById("wishlist-8").onclick = function () {
    AddToWishlist(8);
  };
  document.getElementById("wishlist-9").onclick = function () {
    AddToWishlist(9);
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
  async function AddToWishlist(n) {
    alert(userName);

    let selectedBook = tempArray[n];
    let wishlistString = `${selectedBook.title}, ${selectedBook.author},${selectedBook.publisher},${selectedBook.pageCount},${selectedBook.maturityRating},${selectedBook.bookImage},${selectedBook.link}`;

    wishlistArray += `|${wishlistString}`;

    console.log(wishlistArray);

    await database
      .collection("Users")
      .doc(userdoc)
      .update({ wishlist: [wishlistArray] });
  }
}

// document.getElementById("wishlist-btn").onclick = async function () {
//   await database
//     .collection("Users")
//     .where("name", "==", UserName)
//     .get()
//     .then(function (querySnapshot) {
//       querySnapshot.forEach(function (doc) {
//         Wishlist = doc.data().wishlist;
//         console.log(Wishlist);
//       });
//     });

//   showWishlist(Wishlist);
// };

// function showWishlist(Wishlist) {
//   Wishlist = Wishlist.split("|");
//   for (i = 1; i < Wishlist.length; i++) {
//     let cardWishlist = Wishlist[i].split(",");

//     document.getElementById("wishlist-results").innerHTML += `<br><br>
//     <div  class="col-12 col-md-6 col-lg-4 mt-5 mb-5 " >
//       <div class="card mb-3" style="width: 18rem;">
//       <img class="img-fluid rounded-start"  src='${cardWishlist[5]}' alt="No picture">
//       <div class="card-body">
//     <h5 class="card-title"  >${cardWishlist[0]}</h5>
//     <p class="card-text" >Author: ${cardWishlist[1]}</p>
//     <p class="card-text" ">Publisher: ${cardWishlist[2]}</p>
//     <p class="card-text" >Page Count: ${cardWishlist[3]}</p>
//     <p class="card-text" >Maturity Rating: ${cardWishlist[4]}</p>
//     <a  class="btn btn-primary" >Remove from whishlist</a>
//     <a  class="btn btn-primary"  href="${cardWishlist[6]}" target="_blank">See book</a>
//   </div>
// </div>
// </div>
// <br>

//   `;
//   }
// }
