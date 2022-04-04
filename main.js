document.getElementById("container-searchByTitle").style.visibility = "hidden";
document.getElementById("container-searchByAuthor").style.visibility = "hidden";
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

document.getElementById("searchByTitleBtn").onclick = function () {
  document.getElementById("container-searchByTitle").style.visibility =
    "visible";
  document.getElementById("container-searchByAuthor").style.visibility =
    "hidden";
};

document.getElementById("searchByAuthorBtn").onclick = function () {
  document.getElementById("container-searchByAuthor").style.visibility =
    "visible";
  document.getElementById("container-searchByTitle").style.visibility =
    "hidden";
};

let item, title, author, bookImage, publisher, pageCount, maturityRating;
let numOfBooks = 0;
var apiKey = "key=AIzaSyDtXC7kb6a7xKJdm_Le6_BYoY5biz6s8Lw";

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
          document.getElementById("results").innerHTML +=
            "<h4>Looks like there are no good results for your search :(</h4>";
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

function displayResults(response) {
  document.getElementById("results").innerHTML = "";
  for (let i = 0; i < response.items.length; i++) {
    item = response.items[i];

    title = item.volumeInfo.title;
    author = item.volumeInfo.authors;
    if (item.volumeInfo.publisher == null) {
      publisher = "/";
    } else {
      publisher = item.volumeInfo.publisher;
    }

    maturityRating = item.volumeInfo.maturityRating;
    pageCount = item.volumeInfo.pageCount;

    bookImage = item.volumeInfo.imageLinks
      ? item.volumeInfo.imageLinks.thumbnail
      : placeHolder;
    numOfBooks = i;

    document.getElementById("results").innerHTML += `<br><br>
    <div class="col-12 col-md-6 col-lg-4 mt-5 mb-5 " >
      <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${bookImage}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">Author: ${author}</p>
    <p class="card-text">Publisher: ${publisher}</p>
    <p class="card-text">Page Count: ${pageCount}</p>
    <p class="card-text">Maturity Rating: ${maturityRating}</p>
    <a  class="btn btn-primary">Add to whishlist</a>
  </div>
</div>
</div>
<br>

  `;
  }
}
