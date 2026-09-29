/* =========================
   MOVIE DATA
========================= */

const movies = [

    {
        title: "The Dark Knight",

        genre: "Action",

        rating: 9.0,

        description:
        "Batman faces the Joker, a criminal mastermind who creates chaos across Gotham City.",

        image:
        "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },


    {
        title: "Inception",

        genre: "Sci-Fi",

        rating: 8.8,

        description:
        "A skilled thief who steals secrets through dreams is given a chance to erase his past.",

        image:
        "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
    },


    {
        title: "Interstellar",

        genre: "Sci-Fi",

        rating: 8.7,

        description:
        "A group of astronauts travels through a wormhole searching for a new home for humanity.",

        image:
        "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },


    {
        title: "The Matrix",

        genre: "Sci-Fi",

        rating: 8.7,

        description:
        "A computer programmer discovers that the world around him is a simulated reality.",

        image:
        "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
    },


    {
        title: "Gladiator",

        genre: "Action",

        rating: 8.5,

        description:
        "A Roman general is betrayed and becomes a gladiator seeking revenge.",

        image:
        "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg"
    },


    {
        title: "Avengers: Endgame",

        genre: "Action",

        rating: 8.4,

        description:
        "The Avengers attempt to undo the destruction caused by Thanos and save the universe.",

        image:
        "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },


    {
        title: "Spider-Man: No Way Home",

        genre: "Adventure",

        rating: 8.2,

        description:
        "Spider-Man's identity is revealed, causing villains from different universes to appear.",

        image:
        "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    },


    {
        title: "The Shawshank Redemption",

        genre: "Drama",

        rating: 9.3,

        description:
        "A banker is sentenced to prison and forms an unforgettable friendship while holding onto hope.",

        /*
         * FIXED SHAWShANK POSTER
         */
        image:
        "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
    }

];


/* =========================
   VARIABLES
========================= */

const movieGrid =
document.getElementById("movieGrid");

const searchInput =
document.getElementById("searchInput");

const genreFilter =
document.getElementById("genreFilter");

const ratingSort =
document.getElementById("ratingSort");

const noMovies =
document.getElementById("noMovies");

const modal =
document.getElementById("movieModal");

const modalImage =
document.getElementById("modalImage");

const modalTitle =
document.getElementById("modalTitle");

const modalGenre =
document.getElementById("modalGenre");

const modalRating =
document.getElementById("modalRating");

const modalDescription =
document.getElementById("modalDescription");

const modalWatchlistBtn =
document.getElementById("modalWatchlistBtn");

const watchlistContainer =
document.getElementById("watchlistContainer");

const themeBtn =
document.getElementById("themeBtn");


/* =========================
   WATCHLIST
========================= */

let watchlist = [];


/* =========================
   DISPLAY MOVIES
========================= */

function displayMovies(movieList) {

    movieGrid.innerHTML = "";


    if (movieList.length === 0) {

        noMovies.style.display = "block";

        return;
    }


    noMovies.style.display = "none";


    movieList.forEach((movie) => {

        const movieIndex =
        movies.indexOf(movie);


        const card =
        document.createElement("div");

        card.classList.add("movie-card");


        card.innerHTML = `

            <img
                class="movie-poster"
                src="${movie.image}"
                alt="${movie.title}"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/500x750/202020/ffffff?text=Poster+Not+Available';"
            >


            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>


                <div class="movie-meta">

                    <span class="rating">
                        ⭐ ${movie.rating}
                    </span>

                    <span class="genre">
                        ${movie.genre}
                    </span>

                </div>


                <p class="movie-description">
                    ${movie.description}
                </p>


                <div class="card-buttons">

                    <button
                        class="details-btn"
                        onclick="openMovie(${movieIndex})"
                    >
                        Details
                    </button>


                    <button
                        class="fav-btn"
                        onclick="addToWatchlist(${movieIndex})"
                    >
                        ❤️
                    </button>

                </div>

            </div>
        `;


        movieGrid.appendChild(card);

    });

}


/* =========================
   FILTER MOVIES
========================= */

function filterMovies() {

    const searchText =
    searchInput.value.toLowerCase();


    const selectedGenre =
    genreFilter.value;


    let filteredMovies =
    movies.filter((movie) => {

        const matchesSearch =
        movie.title
        .toLowerCase()
        .includes(searchText);


        const matchesGenre =
        selectedGenre === "All" ||
        movie.genre === selectedGenre;


        return matchesSearch && matchesGenre;

    });


    /* SORTING */

    if (ratingSort.value === "high") {

        filteredMovies.sort(
            (a, b) => b.rating - a.rating
        );

    }


    if (ratingSort.value === "low") {

        filteredMovies.sort(
            (a, b) => a.rating - b.rating
        );

    }


    displayMovies(filteredMovies);

}


/* =========================
   SEARCH
========================= */

searchInput.addEventListener(
    "input",
    filterMovies
);


/* =========================
   GENRE FILTER
========================= */

genreFilter.addEventListener(
    "change",
    filterMovies
);


/* =========================
   RATING SORT
========================= */

ratingSort.addEventListener(
    "change",
    filterMovies
);


/* =========================
   OPEN MOVIE POPUP
========================= */

function openMovie(index) {

    const movie =
    movies[index];


    modalImage.src =
    movie.image;


    modalImage.onerror =
    function() {

        this.src =
        "https://via.placeholder.com/500x750/202020/ffffff?text=Poster+Not+Available";

    };


    modalTitle.textContent =
    movie.title;


    modalGenre.textContent =
    "Genre: " + movie.genre;


    modalRating.textContent =
    "⭐ Rating: " + movie.rating + "/10";


    modalDescription.textContent =
    movie.description;


    modalWatchlistBtn.onclick =
    function() {

        addToWatchlist(index);

    };


    modal.style.display =
    "flex";

}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

    modal.style.display =
    "none";

}


window.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            closeModal();

        }

    }
);


/* =========================
   ADD TO WATCHLIST
========================= */

function addToWatchlist(index) {

    const movie =
    movies[index];


    if (!watchlist.includes(movie)) {

        watchlist.push(movie);

        alert(
            movie.title +
            " added to your watchlist ❤️"
        );

    } else {

        alert(
            movie.title +
            " is already in your watchlist!"
        );

    }


    displayWatchlist();

}


/* =========================
   DISPLAY WATCHLIST
========================= */

function displayWatchlist() {

    watchlistContainer.innerHTML = "";


    if (watchlist.length === 0) {

        watchlistContainer.innerHTML =
        "<p>Your watchlist is empty.</p>";

        return;
    }


    watchlist.forEach((movie) => {

        const item =
        document.createElement("div");


        item.classList.add(
            "watchlist-item"
        );


        item.innerHTML = `

            <div>

                <strong>
                    ${movie.title}
                </strong>

                <span>
                    ⭐ ${movie.rating}
                </span>

            </div>


            <button
                class="remove-btn"
                onclick="removeFromWatchlist(${movies.indexOf(movie)})"
            >
                Remove
            </button>

        `;


        watchlistContainer.appendChild(item);

    });

}


/* =========================
   REMOVE FROM WATCHLIST
========================= */

function removeFromWatchlist(index) {

    const movie =
    movies[index];


    watchlist =
    watchlist.filter(
        item => item !== movie
    );


    displayWatchlist();

}


/* =========================
   WATCHLIST NAVIGATION
========================= */

document
.getElementById("watchlistBtn")
.addEventListener(
    "click",
    function() {

        document
        .getElementById("watchlist")
        .scrollIntoView({
            behavior: "smooth"
        });

    }
);


/* =========================
   DARK / LIGHT MODE
========================= */

themeBtn.addEventListener(
    "click",
    function() {

        document.body
        .classList
        .toggle("light-mode");


        if (
            document.body
            .classList
            .contains("light-mode")
        ) {

            themeBtn.textContent = "☀️";

        } else {

            themeBtn.textContent = "🌙";

        }

    }
);


/* =========================
   INITIAL DISPLAY
========================= */

displayMovies(movies);

displayWatchlist();