const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const selectBook = document.getElementById('select-book');
const selectTrack = document.getElementById('select-track');

const dataForTrack = trackData;

// Songs
let currSong = 0;
const songs = [
    {
        name: '01',
        displayName: '01',
        artist: 'Jasinto design 1',
    },

    {
        name: '02',
        displayName: '02',
        artist: 'Jasinto design 2',
    },

    {
        name: '03',
        displayName: '03',
        artist: 'Jasinto design 3',
    },
    {
        name: '04',
        displayName: '04',
        artist: 'Jasinto design 4',
    },
];


// Check is playing
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        music.pause();
        playBtn.classList.replace('fa-pause', 'fa-play');
    } else {
        music.play();
        playBtn.classList.replace('fa-play', 'fa-pause');
    }

    isPlaying = !isPlaying;
}

function driftSong(pos) {

    let book = selectBook.value;
    let track = selectTrack.value;

    if (dataForTrack[book][track]) {

        let keys = Object.keys(dataForTrack[book]).sort();
        let trackIndex = keys.indexOf(track);
        let newTrack = trackIndex + pos;
        if (newTrack < 0) {
            newTrack = keys.length-1;
        } else if (newTrack == keys.length) {
            newTrack = 0;
        }
        selectTrack.value = keys[newTrack];
        loadSong();
    }
}

function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = '${pr}%'.replace('${pr}', progressPercentage);
        const durationMinute = Math.floor(duration / 60);
        const durationSec = Math.floor(duration % 60);
        if (durationSec) {
            durationEl.textContent = (durationSec<10 ? '${m}:0${s}' : '${m}:${s}')
            .replace('${m}', durationMinute)
            .replace('${s}', durationSec);
        }

        const currMinute = Math.floor(currentTime / 60);
        const currSec = Math.floor(currentTime % 60);
        if (currSec) {
            currTimeEl.textContent = (currSec<10 ? '${m}:0${s}' : '${m}:${s}')
            .replace('${m}', currMinute)
            .replace('${s}', currSec);
        }
    }
}

function setProgressBar(e) {
    const progressPercentage = (e.offsetX / this.clientWidth) * 100;
    progress.style.width = '${pr}%'.replace('${pr}', progressPercentage);
    
    const { duration } = music;
    music.currentTime = progressPercentage * duration / 100;
}

playBtn.addEventListener('click', () => (togglePlay()));
prevBtn.addEventListener('click', () => (driftSong(-1)));
nextBtn.addEventListener('click', () => (driftSong(1)));
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', () => (driftSong(1)));
progressContainer.addEventListener('click', setProgressBar);

// Update DOM
function loadSong() {
    let book = selectBook.value;
    let track = selectTrack.value;
    if (dataForTrack[book][track]) {

        let trackInfo = dataForTrack[book][track];

        title.textContent = trackInfo.name;
        music.src = trackInfo.path;
        if (isPlaying) {
            music.play();
        }
    }
}

// Load list track
function loadList1() {
    selectBook.textContent = '';

    Object.keys(dataForTrack).forEach((id) => {
        opt = document.createElement('option');
        opt.classList.add('option-track');
        opt.value = id;
        opt.textContent = id;
        selectBook.appendChild(opt);
    });
    
}

function loadList2() {
    
    selectTrack.textContent = '';

    let book = selectBook.value;

    if (dataForTrack[book]) {
        Object.keys(dataForTrack[book]).sort().forEach((id) => {
            opt = document.createElement('option');
            opt.classList.add('option-track');
            opt.value = id;
            opt.textContent = id;
            selectTrack.appendChild(opt);
        }); 
    }
    
}

selectBook.addEventListener('change', () => {
    loadList2();
    loadSong();
});

selectTrack.addEventListener('change', loadSong);

loadList1();
loadList2();
loadSong();
