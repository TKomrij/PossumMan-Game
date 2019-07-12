class Sound {
  constructor(src, isLoop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;  
    this.sound.loop = isLoop;

    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";  
    document.body.appendChild(this.sound);
  };

  play() {
    this.sound.play();
  };
  
  pause() {
    this.sound.pause();
  };

  stop() {
    this.sound.pause();
    this.sound.currentTime = 0;
  };

};

$("body div button").click(function() {
let soundGame = new Sound("fcd.mp3", true);
soundGame.play();

})

$(".button2").click(function() {
  let soundGame = new Sound("toot.mp3", true);
  soundGame.play();
  
  })



