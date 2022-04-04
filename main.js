document.getElementById("container-searchByTitle").style.visibility = "hidden";

document.getElementById("searchByTitleBtn").onclick = function () {
    document.getElementById("container-searchByTitle").style.visibility =
        "visible"
    document.getElementById("container-searchByAuthor").style.visibility =
      "hidden";
}

document.getElementById("container-searchByAuthor").style.visibility = "hidden";

document.getElementById("searchByAuthorBtn").onclick = function () {
  document.getElementById("container-searchByAuthor").style.visibility =
        "visible";
    document.getElementById("container-searchByTitle").style.visibility =
      "hidden";
};
