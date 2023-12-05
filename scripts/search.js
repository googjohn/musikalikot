// create a global object for our api values
const searchGlobal = {
  RAPID_API_SPOTIFY_KEY: "6410687375msh748b1fadd4e39eep16ff3ajsn7c2799968395",
  RAPID_API_SPOTIFY_URL: "https://spotify23.p.rapidapi.com/",
  RAPID_API_SPOTIFY_HOST: "spotify23.p.rapidapi.com",
};

const spotify_options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": searchGlobal.RAPID_API_SPOTIFY_KEY,
    "X-RapidAPI-Host": searchGlobal.RAPID_API_SPOTIFY_HOST,
  },
};

// take input value as search query
const searchQuery = document.querySelectorAll(".search");
let inputValue;
let searchThis;
for (const query of searchQuery) {
  query.addEventListener("input", () => {
    inputValue = query.value;
  });
}

// add event listener to search form for submission/searching
const searchFromPlayer = document.querySelector("#music-player-form");
const searchFromContent = document.querySelector("#music-content-form");

searchFromPlayer.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = searchFromPlayer.querySelector('.search')
  inputValue = input.value
  searchFetchData("albums", inputValue);
  input.value = '';
});

searchFromContent.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = searchFromContent.querySelector('.search')
  inputValue = input.value
  searchFetchData("albums", inputValue);
  input.value = '';
});

// function for fetching data: artists data, songs/tracks data, albums data,
async function searchFetchData(endpoint, searchThis) {
  const searchUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(
    searchThis
  )}&type=${endpoint}&offset=0&limit=20&numberOfTopResults=5`;

  const albumsTab = document.getElementById("albums-tab");
  const lyricsTab = document.getElementById('lyrics-tab');
  const artistsTab = document.getElementById('artists-tab');
  albumsTab.classList.add("active");
  artistsTab.classList.remove("active");
  lyricsTab.classList.remove("active");

  try {
    const response = await fetch(searchUrl, spotify_options);

    if (!response.ok) {
      throw new Error(
        "There was an error receiving response",
        response.statusText
      );
    }

    const { albums } = await response.json();
    const items = albums.items;

    // display search result
    const contentDetails = document.querySelector(".content-details");
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");
    contentDetails.innerHTML = "";

    items.forEach((item) => {
      const albumUrl = item.data.uri;
      const content = document.createElement("div");
      content.classList.add("album-container");
      content.innerHTML = `<div class="album-image">
            <a href=${albumUrl} target="_blank"><img src=${item.data.coverArt.sources[2].url}></a>
          </div>
          <div class="album-details">
              <a href=${albumUrl} target="_blank"><p>${item.data.name}</p></a> 
              <span>${item.data.date.year}</span>
          </div>`;

      contentContainer.appendChild(content);
      contentDetails.appendChild(contentContainer);
    });
  } catch (error) {
    console.log("Something went wrong, error fetching data: ", error);
  }
}
