const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.querySelector("main");

// fetch the api url

const emptyDiv = document.querySelector(".empty");

async function getMovies(url) {
  main.innerHTML = "";
  const res = await fetch(url);
  const data = await res.json();
  //   console.log(data.results);

  if (data.results.length > 0) {
    displayMovies(data.results);
  } else {
    emptyDiv.style.display = "none";
  }

  displayMovies(data.results);
}

getMovies(API_URL);

function displayMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    const { title, poster_path, vote_average, overview } = movie;
    movieDiv.innerHTML = `<img src= '${IMG_PATH + poster_path}' alt='${title}'>
                           <div class = 'movie-info'>
                           <h3>${title}</h3>
                           <span class = '${giveRatings(
                             vote_average
                           )}'> ${vote_average} </span>
                           </div>
                           <div class = 'overview'>
                           <h3>Overview</h3>
                           ${overview}
                           </div>
    `;
    main.appendChild(movieDiv);
  });
}

function giveRatings(average) {
  if (average >= 8) {
    return "green";
  } else if (average >= 6) {
    return "orange";
  } else {
    return "red";
  }
}

//search  functionality

const form = document.querySelector("form");
const searchInput = document.querySelector(".search");
const hiddenSearch = document.querySelector(".hidden-search");
const span = document.querySelector(".hidden-search span");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = searchInput.value.trim();
  if (searchValue) {
    hiddenSearch.style.display = "block";
    span.textContent = searchValue;
    getMovies(SEARCH_API + searchValue);
    searchInput.value = "";
  }
});
