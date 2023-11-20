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
    'title': 'Taylor Swift - All Too Well (10 Minute Version) (Taylor\'s Version) (From the Vault)',
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
    'title': 'Taylor Swift - White Horse (Taylor\'s Version)',
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
    'title': 'Taylor Swift feat Ed Sheeran Run (Taylor\'s Version)(From the Vault))',
    'artist_name': 'Taylor Swift',
    'album_image': 'https://media.pitchfork.com/photos/618c3ab295b32339a9955837/1:1/w_450%2Cc_limit/Taylor-Swift-Red-Taylors-Version.jpeg',
    'path': 'https://drive.google.com/uc?id=1Xs93M7RPfkvONAJBzcMYzcsziSfkspTQ',
    'play_time': {
      'totalMilliseconds': 240226,
    }
  }
]

const audio = document.querySelector('audio');
let isPlaying = false;
let currentSongIndex = 0;

function songPlay() {
  // audio.classList.toggle('active')
  const songUrl = songs[currentSongIndex].path;
  audio.src = songUrl;
  isPlaying = true;
  console.log(isPlaying)
  audio.play();

  calculatePlayTime(currentSongIndex);
  currentSongDetails(currentSongIndex)
  // seekBarProgress();

}

function songPause() {
  audio.play()
}

function songResume() {
  audio.play()
}

// function to dynamically fetch and append title and artist and image
function currentSongDetails(currentSongIndex) {

  const songImage = songs[currentSongIndex].album_image;
  const songTitle = songs[currentSongIndex].title;
  const songArtist = songs[currentSongIndex].artist_name;

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


const playtimeProgress = document.querySelector('#playtime-progress');
function calculatePlayTime(currentSongIndex) {

  const playTime = songs[currentSongIndex].play_time.totalMilliseconds;
  const playtimeDuration = document.querySelector('#playtime-duration');
  console.log(playTime);
  const totalPlayTimeSeconds = playTime / 1000;
  console.log('total duration in seconds is ' + totalPlayTimeSeconds + ' seconds');
  const totalPlayTimeMinutes = Math.floor(totalPlayTimeSeconds / 60);
  console.log('total duration in minutes is ' + totalPlayTimeMinutes + ' minutes')
  console.log(totalPlayTimeMinutes % 60);
  const remainingSeconds = Math.floor(totalPlayTimeSeconds % 60);
  console.log(remainingSeconds);
  console.log(
    `${totalPlayTimeMinutes}:${remainingSeconds}`
  )

  remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
  totalPlayTimeMinutes < 10 ? totalPlayTimeMinutes.toString().padStart(2, '0') : remainingSeconds;
  playtimeDuration.textContent = `${totalPlayTimeMinutes}:${remainingSeconds}`
  // playtimeProgress.textContent = `${}`
}

let startTime = 0;
const seekBar = document.querySelector('#seek-Bar')
function seekBarProgress() {
  const currentTime = Date.now()
  console.log(currentTime)
  const elapsedTime = currentTime - startTime;
  const progress = (elapsedTime / totalPlayTimeSeconds)
  seekBar.value = progress;
}

let intervalId;
// setTimeout(
//   intervalId = setInterval(() => {
//     seekBarProgress();
//   }, 1000, 0)
// )

const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');
window.addEventListener('DOMContentLoaded', () => {

  playButton.addEventListener('click', () => {
    songPlay();
  })

  // pauseButton.addEventListener('click', () => {
  //   songPause();
  // })

  // resumeButton.addEventListener('click', () => {
  //   songResume();
  // })

  audio.addEventListener('ended', () => {
    nextSongPlay();
  });
});
