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
