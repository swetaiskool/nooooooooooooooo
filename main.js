  
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');
let track_list = [
  {
    name: "Never Gonna Give You Up",
    artist: "Rick Ashley",
    image: "https://th.bing.com/th/id/R20a25e75a2c4842575481b5423a094a4?rik=0ytzJHpPxzBU0g&riu=http%3a%2f%2fimg1.wikia.nocookie.net%2f__cb20130102175058%2fyoutubepoop%2fimages%2f2%2f2a%2fRick_Ashley.png&ehk=B2IcHQCq8bAW%2bq5DPXBSccPsdDxbmNkXjpJ%2f4rzkC14%3d&risl=&pid=ImgRaw",
    path: "https://github.com/swetaiskool/Testing/raw/main/NGGUP.mp3"
  },
  {
    name: "Discord (Remix)",
    artist: "The Living Tombstone",
    image: "https://th.bing.com/th/id/OIP.zRYCbSUaQjOrXffnyYDPHgHaFj?pid=ImgDet&rs=1",
    path: "https://github.com/swetaiskool/hagefds-a/raw/main/Discord%20-%20The%20Living%20Tombstone%20-%20Lyrics%20(192%20%20kbps).mp3"
  },
  {
    name: "Gansta Paridise",
    artist: "Coolio",
    image: "https://i.ytimg.com/vi/L84zUhOSCIE/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB4rj1LdKCmzBuvJCnSO-aroH6BSQ",
    path: "https://github.com/swetaiskool/jhgewq/raw/main/Coolio%2B-%2BGangsters%2BParadise%2B(Official%2BLyrics%2BOn%2BScreen)%20(192%20%20kbps).mp3",
  },
  {
    name: "Black Catcher",
    artist: "Vickeblanka",
    image: "https://i.scdn.co/image/ab67616d0000b273a4dd28c520dc29d137236423",
    path: "https://github.com/swetaiskool/alhy-egXZ/raw/main/Black%20Clover%20-%20Opening%2010%20(HD)%20(192%20%20kbps).mp3",
  },
  {
    name: "KERAUNOS",
    artist: "PlayaPhonk",
    image: "https://i.ytimg.com/vi/Zl9tGRV6R_s/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDTInO6IkkVVQ9DckVpK7PFBaiJog",
    path: "https://github.com/swetaiskool/.keyjueagdiusk/raw/main/PlayaPhonk%20-%20KERAUNOS%20(OUT%20NOW%20ON%20SPOTIFY)%20(192%20%20kbps).mp3",
  },
  {
    name: "Polish Cow",
    artist: "Cypis",
    image: "https://th.bing.com/th/id/R9a68dc8bfbb8d189e6c6cd8d8e0bf65f?rik=J6IuYs17fwFv6w&pid=ImgRaw",
    path: "https://github.com/swetaiskool/polish-cow/raw/main/1d7ec4c1402d25a1f351411678dcc0cf4b1a1de7da4bddd99b8bbd70f87dfb3f",
  },
  {
    name: "Replay",
    artist: "Iyaz",
    image: "https://th.bing.com/th/id/OIP.ZQUoO105EHiaO2SJ-dqNmAHaEK?pid=ImgDet&rs=1",
    path: "https://github.com/swetaiskool/shawty/raw/main/Iyaz%20-%20Replay%20(lyrics)%20_%20shawty's%20like%20a%20melody%20_%20tiktok%20(192%20%20kbps).mp3",
  },
  {
    name: "Believer",
    artist: "Imagine Dragons",
    image: "https://th.bing.com/th/id/R477c01bca62383f8654a2ec917e0cda1?rik=jQd7yHrvZRDBYA&pid=ImgRaw",
    path: "https://github.com/swetaiskool/believer/raw/main/Imagine%20Dragons%20-%20Believer%20(Lyrics)%20(192%20%20kbps).mp3",
  },
  {
    name: "Centuries",
    artist: "Fall Out Boy",
    image: "https://images.rapgenius.com/01b45ad1449f66823f8f1f0ea350f60a.620x609x1.jpg",
    path: "https://github.com/swetaiskool/cene/raw/main/Centuries%20(192%20%20kbps).mp3",
  },
  {
    name: "The Only Thing they Fear is You",
    artist: "Doom Eternal",
    image: "https://th.bing.com/th/id/Rb546a8d5168eaede2490733f095b6aa0?rik=vCLFdITZKwrarw&pid=ImgRaw",
    path: "https://github.com/swetaiskool/diom/raw/main/Doom%2BEternal%2BOST%2B-%2BThe%2BOnly%2BThing%2Bthey%2BFear%2Bis%2BYou%2B(Mick%2BGordon)%20(192%20%20kbps).mp3",
  },
];

function random_bg_color() {
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function loop() { 
  curr_track.loop = true;
  curr_track.load();
} 

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
