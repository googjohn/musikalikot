// create a global object for our api values
const searchGlobal = {
  RAPID_API_KEY: '96cc313bc6msh9eed516118e6dc5p138fc1jsnf057e04f103d',
  RAPID_API_HOST: 'genius-song-lyrics1.p.rapidapi.com',
  RAPID_API_SEARCH_URL: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
};

// an object that will be passed as argument in fetching datas
const searchQuery = document.querySelector('.song-title').textContent;
const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchQuery}&per_page=10&page=1`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': searchGlobal.RAPID_API_KEY,
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};

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
