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
    'album_image': 'https://media.pitchfork.com/photos/650de105eacc5b460e151343/1:1/w_450%2Cc_limit/Taylor-Swift-1989-Taylors-Version.jpg',
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
]

const audio = document.querySelector('audio');
const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#back');
let isPlaying = false;
let currentSongIndex = 0;

function songPlay() {

  audio.classList.toggle('active')
  isPlaying = true; // set current state
  console.log('The song is played ' + isPlaying)

  const songUrl = songs[currentSongIndex].path;
  audio.src = songUrl;

  calculatePlayTime(currentSongIndex);
  currentSongDetails(currentSongIndex)

  audio.play();
}

function songPause() {
  isPlaying = false;
  console.log('The song is paused ' + isPlaying);
  audio.pause();
}

function songResume() {
  isPlaying = true;
  console.log('The song is played ' + isPlaying);
  audio.play();
}

// function to dynamically fetch and append title and artist and image
function currentSongDetails(currentSongIndex) {

  const songImage = songs[currentSongIndex].album_image;
  const songTitle = songs[currentSongIndex].title;
  const songArtist = songs[currentSongIndex].artist_name;
  // const songUrl = songs[currentSongIndex].url

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

function nextSongPlay() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  songPlay();
}

function prevSongPlay() {
  currentSongIndex = (currentSongIndex - 1) % songs.length;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1
  }
  songPlay();
}


function calculatePlayTime(currentSongIndex) {

  const playtimeProgress = document.querySelector('#playtime-progress');
  const playtimeDuration = document.querySelector('#playtime-duration');

  const playTime = songs[currentSongIndex].play_time.totalMilliseconds; // total milliseconds
  const totalPlayTimeSeconds = playTime / 1000; // total seconds
  const totalPlayTimeMinutes = Math.floor(totalPlayTimeSeconds / 60); // total minutes

  const remainingSeconds = totalPlayTimeSeconds % 60; // make seconds not exceed 60

  // playtimeProgress.textContent = '';


  let songProgressInterval;
  function seekbarProgress() {
    const seekBar = document.querySelector('#seek-bar')

    let startTime = Date.now();
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const progress = elapsedTime / playTime;
    seekBar.value = progress;

    const currentTimeSeconds = Math.floor(elapsedTime / 1000) % 60;
    const currentTimeMinutes = Math.floor(elapsedTime / 1000 / 60);

    if (currentTimeMinutes > totalPlayTimeMinutes) {
      playtimeProgress.textContent = `${totalPlayTimeMinutes}:${remainingSeconds}`
    } else {
      playtimeProgress.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`
    }

    playtimeDuration.textContent = `${totalPlayTimeMinutes < 10 ? totalPlayTimeMinutes.toString().padStart(2, '0') : totalPlayTimeMinutes}:${remainingSeconds < 10 ? remainingSeconds.toString().padStart(2, '0') : remainingSeconds}`

    if (elapsedTime >= playTime) {
      clearInterval(songProgressInterval)
    }
  }


  setTimeout(() => {
    songProgressInterval = setInterval(() => {
      seekbarProgress();
    }, 1000)

  }, 0)



  // const songIntervalId = setInterval(() => {

  //   const songCurrentTime = Math.floor(audio.currentTime % 60);
  //   const songCurrentMinute = songCurrentTime / 60;

  //   playtimeProgress.textContent = `${totalPlayTimeMinutes < 10 ? totalPlayTimeMinutes.toString().padStart(2, '0') : totalPlayTimeMinutes}:${songCurrentTime < 10 ? songCurrentTime.toString().padStart(2, '0') : songCurrentTime}`;

  // }, 1000)

  // setTimeout(songIntervalId, 0)

  // let startTime = 0;
  // const seekBar = document.querySelector('#seek-Bar')
  // const currentTime = Date.now();
  // startTime = Date.now();
  // console.log(currentTime)
  // const elapsedTime = currentTime - startTime;
  // const progress = (elapsedTime / totalPlayTimeSeconds);
  // seekBar.value = progress;


}

// let intervalId;
// setTimeout(
//   intervalId = setInterval(() => {
//     seekBarProgress();
//   }, 1000, 0)
// )


window.addEventListener('DOMContentLoaded', () => {
});

playButton.addEventListener('click', () => {

  if (audio.classList.contains('active') && !isPlaying) {

    songResume();
    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'

  } else if (!isPlaying) {

    songPlay();
    playButton.classList.toggle('active')
    playButton.style.display = 'none';
    pauseButton.style.display = 'flex';
  }

});

pauseButton.addEventListener('click', () => {

  if (isPlaying) {

    songPause();
    // audio.classList.remove('active')
    playButton.classList.remove('active')
    pauseButton.classList.remove('active')
    playButton.style.display = 'flex'
    pauseButton.style.display = 'none'
  }

})

nextButton.addEventListener('click', () => {
  nextSongPlay()
});

prevButton.addEventListener('click', () => {
  prevSongPlay()
});

audio.addEventListener('ended', () => {
  nextSongPlay();
});
