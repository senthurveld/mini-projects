// Movie Fetch App
// console.log(`<-- Welcome to Movie Fetcher APP-->`);

const API_KEY = "a8524b8d";

// Function for api loading

const fetchMovie = async (movie) => {
  try {
    showLoading();
    const response = await fetch(
      `https://www.omdbapi.com/?t=${movie}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Not Found on database");
    } else {
      console.log("good");
    }

    const data = await response.json();
    showResult(data);
    console.log(data);
  } catch (error) {
    showError(error.message);
  } finally {
    hideLoading();
  }
};

// Gettin vaules from user input and execute...

document.querySelector("#fetchButton").addEventListener("click", () => {
  const movie = document.querySelector("#movieTitle").value;
  if (movie) {
    fetchMovie(movie);
  }
});

// DOM to implement

function showLoading() {
  document.querySelector("#loading").innerHTML = "Movie is ⏳ Fetching...";
}

function hideLoading() {
  document.querySelector("#loading").innerHTML = "";
}

function showResult(data) {
  const html = `
    <div class="movie-card">
        <img src="${data.Poster}" alt="${data.Title} Poster" height="250px" width:"250px">
    </div>
        <div class="movie-data">
        <h1>${data.Title}</h1>
        <p>Year: ${data.Year}</p>
        <p>Language: ${data.Language}</p>
        <p>Director: ${data.Director}</p>
        <p>Actors: ${data.Actors}</p>
        <p>Genre: ${data.Genre}</p>
        <p>Plot: ${data.Plot}</p>
    </div>

    `;
  console.log(data.Title);

  document.querySelector("#movieDetails").innerHTML = html;
}

function showError(message) {
  document.querySelector(
    "#movieDetails"
  ).innerHTML = `<p style="color:red;">❌ ${message}</p>`;
}
