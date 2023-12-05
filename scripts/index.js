// object containing song sample
const songs = [
  {
    'title': 'Love Story (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/606f5e145aedaea021481c20/1:1/w_450%2Cc_limit/Taylor-Swift-Fearless.jpeg',
    'path': 'https://drive.google.com/uc?id=1Te5bqL7D0Eu-onNVCKGycI62esA7OCPR',
    'play_time': {
      'totalMilliseconds': 235766,
    }
  },
  {
    'title': 'All Too Well (10 Minute Version) (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/650de105eacc5b460e151343/1:1/w_450%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg',
    'path': 'https://drive.google.com/uc?id=1m8RnDj5eXSbQxYyqCv1AdjowLG2IBLH5',
    'play_time': {
      'totalMilliseconds': 631000,
    }
  },
  {
    'title': 'Fifteen (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/618c3ab295b32339a9955837/1:1/w_450%2Cc_limit/Taylor-Swift-Red-Taylors-Version.jpeg',
    'path': 'https://drive.google.com/uc?id=1-26m-7cDC5Phl1hpWHWypsBzv6h-DAOp',
    'play_time': {
      'totalMilliseconds': 294000,
    }
  },
  {
    'title': 'White Horse (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/618c3ab295b32339a9955837/1:1/w_450%2Cc_limit/Taylor-Swift-Red-Taylors-Version.jpeg',
    'path': 'https://drive.google.com/uc?id=1ReDp5pVJOScPhx8T4vt_fFVk2v5kpC5_',
    'play_time': {
      'totalMilliseconds': 234515,
    }
  },
  {
    'title': 'You Belong With Me (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/606f5e145aedaea021481c20/1:1/w_450%2Cc_limit/Taylor-Swift-Fearless.jpeg',
    'path': 'https://drive.google.com/uc?id=1FuBmYp6hLAkpsNQI8K6Qc7xr_QZ6xu7l',
    'play_time': {
      'totalMilliseconds': 231124,
    }
  },
  {
    'title': 'Taylor Swift feat Ed Sheeran Run (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/618c3ab295b32339a9955837/1:1/w_450%2Cc_limit/Taylor-Swift-Red-Taylors-Version.jpeg',
    'path': 'https://drive.google.com/uc?id=1Xs93M7RPfkvONAJBzcMYzcsziSfkspTQ',
    'play_time': {
      'totalMilliseconds': 240226,
    }
  }
];

const global = {
  RAPID_API_GENIUS_KEY_5: '9cd319bd1cmsh79215895bb207c5p1ddb19jsn0e180cb44dc2', // RESERVE
  RAPID_API_GENIUS_KEY_4: '6410687375msh748b1fadd4e39eep16ff3ajsn7c2799968395', // RESERVE
  RAPID_API_GENIUS_KEY_3: '96cc313bc6msh9eed516118e6dc5p138fc1jsnf057e04f103d', // ALMOST REACHED 90
  RAPID_API_GENIUS_KEY_2: '89a844fbd9mshf5d9827da1f4d6cp1576c5jsn002121fd8bd2', // CALL LIMIT REACHED
  RAPID_API_GENIUS_KEY_1: '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036', // CALL LIMIT REACHED
  RAPID_API_SPOTIFY_KEY_5: '9cd319bd1cmsh79215895bb207c5p1ddb19jsn0e180cb44dc2', // RESEVE
  RAPID_API_SPOTIFY_KEY_4: '6410687375msh748b1fadd4e39eep16ff3ajsn7c2799968395', // RESERVE
  RAPID_API_SPOTIFY_KEY_3: '96cc313bc6msh9eed516118e6dc5p138fc1jsnf057e04f103d', // CALL LIMIT REACHED
  RAPID_API_SPOTIFY_KEY_2: '89a844fbd9mshf5d9827da1f4d6cp1576c5jsn002121fd8bd2', // CURRENT IN USE 200
  RAPID_API_SPOTIFY_KEY_1: '57027509admsh3f917f0e5c3e343p1317bcjsn6762b68bc036', // CALL LIMIT REACHED
  RAPID_API_GENIUS_URL: 'https://genius-song-lyrics1.p.rapidapi.com/',
  RAPID_API_GENIUS_HOST: 'genius-song-lyrics1.p.rapidapi.com',
  RAPID_API_SPOTIFY_URL: 'https://spotify23.p.rapidapi.com/',
  RAPID_API_SPOTIFY_HOST: 'spotify23.p.rapidapi.com',
}


const geniusOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': global.RAPID_API_GENIUS_KEY_5,
    'X-RapidAPI-Host': global.RAPID_API_GENIUS_HOST
  }
};

const spotifyOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': global.RAPID_API_SPOTIFY_KEY_4,  
    'X-RapidAPI-Host': global.RAPID_API_SPOTIFY_HOST
  }
};

// other global variables
const audio = document.querySelector('audio');
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#back');

let isPlaying = false;
let currentSongIndex = 0;
let progress = 0
let startTime;
let seekbarIntervalId;

// function to play app
function songPlay() {
  audio.classList.toggle('active');
  isPlaying = true;
  startTime = Date.now() - progress * (songs[currentSongIndex].play_time.totalMilliseconds)

  const songPath = songs[currentSongIndex].path;
  audio.src = songPath;

  currentSongDetails(currentSongIndex);
  getSongLyrics('song/lyrics/');

  const albumsTab = document.getElementById('albums-tab');
  const artistsTab = document.getElementById('artists-tab');
  const lyricsTab = document.getElementById('lyrics-tab');
  albumsTab.classList.remove('active');
  artistsTab.classList.remove('active');
  lyricsTab.classList.add('active');


  seekbarIntervalId = setInterval(() => {
    seekbarPlaytimeProgress(currentSongIndex)
  }, 1000);

  audio.play();
}

// function to pause
function songPause() {
  if (!audio.paused) {
    audio.pause();
    // isPlaying = false;
  clearInterval(seekbarIntervalId);
  } 
}

// function to resume
function songResume() {
  if (audio.paused) {
    startTime = Date.now() - progress * songs[currentSongIndex].play_time.totalMilliseconds;
    seekbarIntervalId = setInterval(() => {
      seekbarPlaytimeProgress(currentSongIndex);
    }, 1000);
    audio.play();
  }
}

// function for previous song to play
function prevSongPlay() {
  currentSongIndex = (currentSongIndex - 1) % songs.length;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  };
  startTime = Date.now() - progress * songs[currentSongIndex].play_time.totalMilliseconds;
  progress = 0;
  songPlay();
}

// function for next song to play
function nextSongPlay() {
  // using modulo will ensure that currentSongIndex won't exceed songs length
  // works as a looping mechanisim as well - as it will always go back to 0 index
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  startTime = Date.now() - progress * songs[currentSongIndex].play_time.totalMilliseconds;

  progress = 0
  songPlay();
  
}

// function to update current song details dynamically
// call inside songPlay function
function currentSongDetails(currentSongIndex) {

  const songImage = songs[currentSongIndex].album_image;
  const songTitle = songs[currentSongIndex].title;
  const songArtist = songs[currentSongIndex].artist_name;
  const songPath = songs[currentSongIndex].path

  const songImageDom = document.querySelector('.song-image img');
  const songUrlDom = document.querySelector('.song-image a');
  const songTitleDom = document.querySelector('.song-title');
  const songArtistDom = document.querySelector('.artist-name');

  songImageDom.parentElement.parentElement.style.boxShadow = 'none';
  songImageDom.parentElement.parentElement.style.textAlign = 'left';
  songImageDom.src = songImage;
  songImageDom.classList.add('dynamic-song-image');
  songImageDom.classList.add('box-shadow');

  songTitleDom.textContent = songTitle;
  songArtistDom.textContent = songArtist;
}

// function to update current playtime and seekbar progress
// call inside songPlay function
function seekbarPlaytimeProgress(currentSongIndex) {

  const seekBar = document.querySelector('#seek-bar');
  const songDuration = document.querySelector('#playtime-duration');
  const songProgress = document.querySelector('#playtime-progress');

  const playtimeDuration = songs[currentSongIndex].play_time.totalMilliseconds;

  const currentTime = Date.now();
  const elapsed = currentTime - startTime;
  progress = elapsed / songs[currentSongIndex].play_time.totalMilliseconds;
  // const progress = (elapsed / playtimeDuration);
  seekBar.value = progress;

  const totalSeconds = Math.floor(playtimeDuration / 1000);
  const currentSeconds = Math.floor(elapsed / 1000) % 60;
  const currentMinute = Math.floor(elapsed / 1000 / 60);
  const totalMinute = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  const formattedRemainingSeconds = remainingSeconds.toString().padStart(2, '0')
  const formattedCurrentSeconds = currentSeconds.toString().padStart(2, '0')

  if (currentMinute > totalMinute) {
    songProgress.innerHTML = `${totalMinute}:${formattedRemainingSeconds}`;
  } else {
    songProgress.innerHTML = ` ${'0' + currentMinute}:${formattedCurrentSeconds}`;
  }

  songDuration.innerHTML = `${totalMinute < 10 ? '0' + totalMinute : totalMinute}:${formattedRemainingSeconds}`;

  const pauseI = document.querySelector('#pause i');
  const playI = document.querySelector('#play i');
  if (progress > 0 && progress < 1) {
    playI.classList.add('active-effect');
    pauseI.classList.add('active-effect');
  } else {
    playI.classList.remove('active-effect');
    pauseI.classList.remove('active-effect');
  }

  if (elapsed >= playtimeDuration) {
    clearInterval(seekbarIntervalId)
  }

}

// function to fetch song id which will be used to get the song lyric
async function fetchSongId(endpoint1, currentSongIndex) {

  const searchQuery = songs[currentSongIndex].title;
  const searchUrl = `https://genius-song-lyrics1.p.rapidapi.com/${endpoint1}?q=${encodeURIComponent(searchQuery)}&per_page=10&page=1`;

  try {
    const response = await fetch(searchUrl, geniusOptions)

    if (!response.ok) {
      console.error('Oops! Something went wrong with the response', response.statusText)
      return;
    }

    const result = await response.json();
    const songId = result.hits[0].result.id;

    return songId;

  } catch (error) {
    console.error('Oops, we encounter a problem while fetching data', error)
  }
}

// function to get the song lyrics and display to the dom/content details
async function getSongLyrics(endpoint2) {

  try {

    const songId = await fetchSongId('search/', currentSongIndex);

    const songUrl = `https://genius-song-lyrics1.p.rapidapi.com/${endpoint2}?id=${songId}`;

    const response = await fetch(songUrl, geniusOptions);

    if (!response.ok) {
      console.error('There was an error in response', response.statusText)
      return;
    }

    const result = await response.json();
    const songLyrics = result.lyrics.lyrics.body.html;

    const contentDetails = document.querySelector('.content-details');
    contentDetails.classList.remove('flexed')
    contentDetails.innerHTML = '';
    const content = document.createElement('div')
    content.classList.add('song-lyrics')
    content.innerHTML = songLyrics;

    contentDetails.appendChild(content);

  } catch (error) {
    console.error('Oops, we encounter a problem while fetching data', error);
  }
}

// function to fetch api data from spotify
async function fetchSpotifyAPIData(endpoint, searchQuery) {

  const searchSpotify = `https://spotify23.p.rapidapi.com/search/?q=${encodeURIComponent(searchQuery)}&type=${endpoint}&offset=0&limit=20&numberOfTopResults=5`;
  try {
    const response = await fetch(searchSpotify, spotifyOptions);

    if (!response.ok) {
      console.error('There was an error in response', response.statusText)
      return;
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('Oops, we encounter a problem while fetching data', error)
  }
}

// function to get albums
async function getAlbums() {

  const albumsTab = document.getElementById('albums-tab');
  albumsTab.classList.add('active');

  const searchQuery = songs[currentSongIndex].artist_name;
  try {

    const { albums } = await fetchSpotifyAPIData('albums', searchQuery);

    const contentDetails = document.querySelector('.content-details');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    contentDetails.innerHTML = '';

    const items = albums.items

    items.forEach((item, index) => {
      const albumUrl = item.data.uri;
      const content = document.createElement('div');
      content.classList.add('album-container');
      content.innerHTML =
        `<div class="album-image">
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
    console.log('Error fetching Albums data from API', error)
  }
}
// for initial content
getAlbums();


// function to get artist id and use this to make request to get related artists
async function getArtistId(currentSongIndex) {

  const searchQuery = songs[currentSongIndex].artist_name;

  try {
    const { artists } = await fetchSpotifyAPIData('artists', searchQuery);

    const artistId = artists.items[0].data.uri.slice(15);

    return artistId;

  } catch (error) {
    console.error('Oops, we encounter a problem while fetching data', error)
  }
}

// function to get related artists
async function getRelatedArtist(endpoint) {

  try {
    const artistId = await getArtistId(currentSongIndex);
    const getArtistsUrl = `https://spotify23.p.rapidapi.com/${endpoint}/?id=${artistId}`;

    const response = await fetch(getArtistsUrl, spotifyOptions)

    if (!response.ok) {
      console.error('There was an error in response', response.statusText)
      return;
    }

    const result = await response.json();
    const relatedArtists = result.artists;

    const contentDetails = document.querySelector('.content-details');
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');

    contentDetails.innerHTML = '';

    relatedArtists.forEach(artist => {
      const artistSpotify = artist.uri;
      const artistImage = artist.images[1].url;
      const artistName = artist.name;
      const content = document.createElement('div');
      content.classList.add('artists-container');
      content.innerHTML =
        `<div class="album-image">
          <a href=${artistSpotify} target="_blank"><img src=${artistImage}></a>
        </div>
        <div class="album-details">
          <a href=${artistSpotify} target="_blank"><p>${artistName}</p></a> 
        </div>`;

      contentContainer.appendChild(content);
      contentDetails.appendChild(contentContainer);
    })

  } catch (error) {
    console.error('Oops, we encounter a problem while fetching data', error)
  }
};

const lyricsTab = document.getElementById('lyrics-tab');
const albumsTab = document.getElementById('albums-tab');
const artistsTab = document.getElementById('artists-tab');

window.addEventListener('DOMContentLoaded', () => {

  // play button event listener
  playButton.addEventListener('click', () => {

    if (!isPlaying) {
      songPlay();
      } else {
      if (audio.paused) {
        songResume();
      } 
      
    }
    
    playButton.classList.add('active')
    pauseButton.classList.remove('active')
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
    console.log(isPlaying)
      

  });

  // pause button event listener
  pauseButton.addEventListener('click', () => {

    songPause();
    // audio.classList.remove('active')
    playButton.classList.remove('active')
    pauseButton.classList.remove('active')
    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'
    console.log(isPlaying)
    
  })

  // next button event listener
  nextButton.addEventListener('click', () => {
    nextSongPlay()
    playButton.classList.add('active')
    pauseButton.classList.remove('active')
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
  });

  // prev button event listener
  prevButton.addEventListener('click', () => {
    prevSongPlay()
    playButton.classList.add('active')
    pauseButton.classList.remove('active')
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
  });

  // audio event listener
  audio.addEventListener('ended', () => {
    clearInterval(seekbarIntervalId);
    nextSongPlay();
  });

  // lyric tab event listener
  lyricsTab.addEventListener('click', () => {
    lyricsTab.classList.add('active')
    albumsTab.classList.remove('active');
    artistsTab.classList.remove('active');
    getSongLyrics('song/lyrics/');
  });

  // artist tab event listener
  artistsTab.addEventListener('click', () => {
    artistsTab.classList.add('active')
    albumsTab.classList.remove('active');
    lyricsTab.classList.remove('active');
    getRelatedArtist('artist_related')
  });

  // albums tab event listener
  albumsTab.addEventListener('click', () => {
    albumsTab.classList.add('active')
    artistsTab.classList.remove('active')
    lyricsTab.classList.remove('active');
    getAlbums();
  })

});

