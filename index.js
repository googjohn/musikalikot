const songs = [
  {
    'title': 'Love Story (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'path': 'https://drive.google.com/uc?id=1Te5bqL7D0Eu-onNVCKGycI62esA7OCPR',
    'play_time': {
      'totalMilliseconds': 235766,
    }
  },
  {
    'title': 'Taylor Swift - All Too Well (10 Minute Version) (Taylor\'s Version) (From The Vault)',
    'artist_name': 'Taylor Swift',
    'path': 'https://drive.google.com/uc?id=1m8RnDj5eXSbQxYyqCv1AdjowLG2IBLH5',
    'play_time': {
      'totalMilliseconds': 631000,
    }
  },
  {
    'title': 'Fifteen (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'path': 'https://drive.google.com/uc?id=1-26m-7cDC5Phl1hpWHWypsBzv6h-DAOp',
    'play_time': {
      'totalMilliseconds': 294000,
    }
  },
  {
    'title': 'Taylor Swift - White Horse (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'path': 'https://drive.google.com/uc?id=1ReDp5pVJOScPhx8T4vt_fFVk2v5kpC5_',
    'play_time': {
      'totalMilliseconds': 234515,
    }
  },
  {
    'title': 'You Belong With Me (Taylor\'s Version)',
    'artist_name': 'Taylor Swift',
    'path': 'https://drive.google.com/uc?id=1FuBmYp6hLAkpsNQI8K6Qc7xr_QZ6xu7l',
    'play_time': {
      'totalMilliseconds': 231124,
    }
  },
  {
    'title': 'Taylor Swift feat Ed Sheeran Run taylor-s-version-from-the-vault',
    'artist_name': 'Taylor Swift',
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
  audio.classList.toggle('active')
  isPlaying = true;
  console.log(isPlaying)
  const songUrl = songs[currentSongIndex].path;
  audio.src = songUrl;
  audio.play();

  calculatePlayTime(currentSongIndex);
}

function songPause() {
  if (audio.played) {
    audio.pause();
    isPlaying = false
    console.log(isPlaying)
  }
}

function songResume() {
  if (audio.paused) {
    audio.play();
    isPlaying = true
    console.log(isPlaying)
  }
}


function nextSongPlay() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  songPlay();
}

function calculatePlayTime(currentSongIndex) {
  const playTime = songs[currentSongIndex].play_time.totalMilliseconds;
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

}

const playButton = document.querySelector('#play');
const pauseButton = document.querySelector('#pause');
const resumeButton = document.querySelector('#resume');
window.addEventListener('DOMContentLoaded', () => {

  playButton.addEventListener('click', () => {
    songPlay();
  })

  pauseButton.addEventListener('click', () => {
    songPause();
  })

  resumeButton.addEventListener('click', () => {
    songResume();
  })

  audio.addEventListener('ended', () => {
    nextSongPlay();
  });
});
