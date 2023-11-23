// create a global object for our api values
const global = {
  RAPID_API_KEY: '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036',
  RAPID_API_HOST: 'genius-song-lyrics1.p.rapidapi.com',
  RAPID_API_SEARCH_URL: 'https://genius-song-lyrics1.p.rapidapi.com/search/',
};

// an object that will be passed as argument in fetching datas
const searchQuery = document.querySelector('.song-title').textContent;
console.log(searchQuery)
const url = `https://genius-song-lyrics1.p.rapidapi.com/search/?q=${searchQuery}&per_page=10&page=1`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036',
    'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
  }
};

async function fetchAPIData() {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      console.log(error)
    }
    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.error(error);
  }
}

async function fetchSongLyrics() {
  try {
    const { hits } = await fetchAPIData(searchQuery);
    const targetTrack = hits[0].result;
    console.log(targetTrack);

    const songLyric = targetTrack.path
    console.log(songLyric);
    const songUrl = targetTrack.url
    console.log(songUrl);

    const content = document.querySelector('.content-details');
    content.textContent = songLyric


  } catch (error) {
    console.error(error)
  }
}
// fetchSongLyrics();