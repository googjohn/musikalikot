// create a global object for our api values
const searchGlobal = {
  RAPID_API_SPOTIFY_KEY: '6410687375msh748b1fadd4e39eep16ff3ajsn7c2799968395',
  RAPID_API_SPOTIFY_URL: 'https://spotify23.p.rapidapi.com/',
  RAPID_API_SPOTIFY_HOST: 'spotify23.p.rapidapi.com',
};

// take input value as search query
const searchQuery = document.querySelectorAll('.search');
let inputValue;
let searchThis;
console.log(searchQuery);
  for (const query of searchQuery) {
    query.addEventListener('input', (event) => {
      inputValue = query.value
      console.log(inputValue)
      searchThis = inputValue;
      handleSearchInput(event)
    })
  }

  console.log(searchThis)

const spotify = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': searchGlobal.RAPID_API_SPOTIFY_KEY,
    'X-RapidAPI-Host': searchGlobal.RAPID_API_SPOTIFY_HOST
  }
};

// function for fetching data: artists data, songs/tracks data, albums data,
async function searchFetchData(endpoint) {
  const searchUrl = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(searchThis)}&type=${endpoint}&offset=0&limit=20&numberOfTopResults=5`;

  try {
    const response = await fetch(searchUrl, spotify)
    console.log(response);

    if(!response.ok) {
      console.error('There was an error receiving response', response.statusText)
    }

    const result = response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.log('Something went wrong, please read', error)
  }
};

// get value after enter keypress
function handleSearchInput(event) {
  // event.preventDefault();
  if (event.key === 'Enter') {
    searchFetchData('albums');
  }
}


function handleSearchButtonClick(event) {
  // event.preventDefault();
  if (event) {
    searchFetchData('albums');
  }
}
handleSearchButtonClick()


