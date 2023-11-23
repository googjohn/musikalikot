window.addEventListener('DOMContentLoaded', async () => {

// create a global object for our api values
const global = {
  RAPID_API_KEY: '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036',
  RAPID_API_HOST: 'genius-song-lyrics1.p.rapidapi.com',
  RAPID_API_SEARCH_URL: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
};

// save input value in a variable
const searchQuery = getSearchValue();
console.log(searchQuery);

const options = {
  method: 'GET',
  url: global.RAPID_API_SEARCH_URL,
  params: {
    q: searchQuery, // use the saved input value here as params property
    per_page: '10',
    page: '1',
  },
  headers: {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': global.RAPID_API_KEY,
    'X-RapidAPI-Host': global.RAPID_API_HOST
  }
};
console.log(options.params.q);


// get the search input value
function getSearchValue () {
  const search = document.getElementById('search');
  const searchValue = search.value;
  return searchValue;
};

// function for fetching data: artists data, songs/tracks data, albums data,
async function fetchData(options) {
  try {
    const response = await axios.request(options)
    console.log(response.data);

  } catch (error) {
    console.log('Something went wrong, please read', error)
  }
};

// get value after enter keypress
function handleSearchInput(event) {
  if (event.key === 'Enter') {
    fetchData(options);
  }
}

function handleSearchButtonClick() {
  fetchData(options);
}

const search = document.getElementById('search');
const searchButton = document.querySelector('.search-label i');
search.addEventListener('keypress', handleSearchInput)
searchButton.addEventListener('click', handleSearchButtonClick)

});