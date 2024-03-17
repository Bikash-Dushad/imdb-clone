const favorites = JSON.parse(localStorage.getItem("favorites")) || []; // gets the value from local storage using key favorites
const favoritesList = document.getElementById("favoritesList");


// displays the movie list and index helps to delete
function createMovie(movie, index) {
  const movieItem = document.createElement("div");
  movieItem.classList.add("movie-item");

  //displays the poster
  const img = document.createElement("img");
  img.src = movie.Poster;
  img.classList.add("movie-image");
  movieItem.appendChild(img);

  //displays movie title and delete button
  const details = document.createElement("div");
  details.classList.add("movie-details");
  details.innerHTML = `${movie.Title}`;
  favoritesList.appendChild(details);
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    deleteFavorite(index);
    refreshFavoritesList();
  });
  details.appendChild(deleteButton);

  return details, movieItem;
}

//movies are identified by index and deleted
function deleteFavorite(index) {
  favorites.splice(index, 1);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("movied deleted")
}

function refreshFavoritesList() {
  favoritesList.innerHTML = "";
  favorites.forEach((movie, index) => {
    favoritesList.appendChild(createMovie(movie, index));
  });
}

// Initial rendering
refreshFavoritesList();
