let songs = Array.from(document.getElementsByClassName('songItem'));
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('ProgressBar');
let audioElement = new Audio();
let currentSongIndex = 0;

// Play selected song from list
songs.forEach((song, index) => {
    song.addEventListener('click', () => {
        currentSongIndex = index;
        playSong(song.getAttribute('data-src'));
    });
});

// Master Play/Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    }
});

// Update progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    progressBar.value = progress || 0;
});

// Seek in song
progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value * audioElement.duration) / 100;
});

// Next/Prev buttons
document.getElementById('nextBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex].getAttribute('data-src'));
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex].getAttribute('data-src'));
});

// Function to play song
function playSong(src) {
    audioElement.src = src;
    audioElement.play();
    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
}
