let mybutton = document.getElementById("btn-back-to-top");

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

let placeHolder = `<img src="https://via.placeholder.com/150">`;

let item, title, author, bookImage, publisher, pageCount, maturityRating, link;
let numOfBooks = 0;
var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";
let tempArray = [];
let Wishlist;
let WishlistArray;

//search koji se pokrece clickom na button, koristili smo jquery
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
//dohvaćamo inputName i id usera iz firebasea
var userName = JSON.parse(localStorage.getItem("inputName")); 

var userdoc = JSON.parse(localStorage.getItem("docUser"));

//ispisujemo response od api-ja u html karticama 
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

    //kreiramo objekt od svake knjige koje onda spremamo u niz objekata tempArray
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

  //provjeravamo koju knjigu user želi dodati na wishlist
  document.getElementById("wishlist-0").onclick = function () {
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


  async function AddToWishlist(n) {
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
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().name === userName) {
            docUser = doc.id;
            WishlistArray = doc.data().wishlist; // dohvaćamo wislist usera sa firebasea koji je zapravo string a ne array
          }
        });
      });

    let selectedBook = tempArray[n];//kreiramo objekt od odabrane knjige niza objekata 

    //kreiramo string od objekta sa svim svojstava objekta knjige
    let wishlistString = `${selectedBook.title}*${selectedBook.author}*${selectedBook.publisher}*${selectedBook.pageCount}*${selectedBook.maturityRating}*${selectedBook.bookImage}*${selectedBook.link}`;

    // kreiramo novi string koji sadrži sve stare knjige i novo odabrane knjige 
    let wishlistfinallist = WishlistArray + "|" + wishlistString;

    //upadatea se firebase 
    await database
      .collection("Users")
      .doc(userdoc)
      .update({ wishlist: [wishlistfinallist] });

    selectedBook = null;
    wishlistString = null;

  }
}
