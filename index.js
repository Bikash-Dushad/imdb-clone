const apiKey = "2801f2b6";


// adding event listener to home button
const homepage = document.getElementById('homepage')
homepage.addEventListener('click',()=> {
    window.location.href = 'index.html';
})

// adding event listner to fav button
const favpage = document.getElementById('favpage')
favpage.addEventListener('click',()=> {
    window.location.href = 'favorites.html';
})


var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
    if (event.key == 'Enter') {

        searchButton.click();
    }
});

// searching movie 
var searchButton = document.getElementById("Search-button");
searchButton.addEventListener("click", function () {
    console.log(input.value);
    fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=${apiKey}`)
        .then(response =>response.json())
        .then(data => displayMovies(data.Search)) // displays the list of searched movies.
        .catch(error => console.error("Error:", error));
});

// list of movies to be displayed with some details
function displayMovies(movies) {
    const moviesList = document.getElementById("movie-list");
    moviesList.innerHTML = '';
    if(movies){
        movies.forEach(movie => {
            const list = document.createElement('li');
            list.innerHTML =   // some details of movie after search
            `
                <div id="movie-list-div">
                    <img src="${movie.Poster}">
                    <figcaption id="movie-caption">
                        <h5>${movie.Title}</h5>
                        <span>${movie.Year}</span>
                    </figcaption>
                </div>
            `
            // After clicking the particular movie its details will be displayed
            list.addEventListener('click', function() {
                moviesList.innerHTML = '';
                movieDetail(movie.imdbID);
            });
            moviesList.appendChild(list);
        });
    }else{
        moviesList.innerHTML = `
        <img src="./images/nomovie.png" height="200px" width="200px">
        `
    }
    }

// after clicking on movie, details of movie
function movieDetail(imdbID) {
    const moviesList = document.getElementById("movie-list");

    console.log('Fetching details for movie:', imdbID);
    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            const list = document.createElement('li');
            
            list.innerHTML =   // along with all details a button is also created to add movie to fav list
             `
                <div id="clicked-movie-div">
                <div id="image">
                <img src="${data.Poster}" alt="">
                </div>
                <div id="content">
                <button id="addToFavBtn"><i class="fa-regular fa-heart fa-fade"></i></button>
                <h3>${data.Title}</h3>
                <p>Actors: ${data.Actors}</p>
                <p>Director: ${data.Director}</p>
                <p>Released: ${data.Released}</p>
                <p>Runtime: ${data.Runtime}</p>
                <p>imdb Rating: ${data.imdbRating}</p>
                <p>Awards: ${data.Awards}</p>
                <p>Plot: ${data.Plot}</p>
                <div>
                </div>
            `;

            moviesList.appendChild(list);
            const addToFavBtn = document.getElementById('addToFavBtn');
            addToFavBtn.addEventListener('click', function() {
                addToFavBtn.innerHTML = `<i class="fa-solid fa-heart"></i>`
                addToFavorites(data);
            });
        })
        .catch(error => {
            console.error("Error fetching movie details:", error);
        });
}

function addToFavorites(movie) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []; // retrives the value from local storage and prase into object
    
    // checking if movie already exist in fav
    const movieAlreadyPresent = favorites.some(fav => fav.imdbID === movie.imdbID);
    if (!movieAlreadyPresent) {
        favorites.push(movie);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // sets object key as favorites
        alert("movie added to fav")
        } else {
        alert('This movie is already present in your fav');
    }
}
