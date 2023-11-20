// create a global object for our api values
const global = {
  RAPID_API_KEY: '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036',
  RAPID_API_HOST: 'genius-song-lyrics1.p.rapidapi.com',
  RAPID_API_SEARCH_URL: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
};

// an object that will be passed as argument in fetching datas
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

