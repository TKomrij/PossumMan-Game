
  // spawn images randomly
  var images = []

  images[0] = new Image()
  images[0].src = "https://media.giphy.com/media/dYwyN5xXBP5hSP77bo/giphy.gif";

  images[1] = new Image()
  images[1].src = "https://media.giphy.com/media/1qfKSo9vsdZh70D4ZT/giphy.gif";

  images[2] = new Image()
  images[2].src = "https://media.giphy.com/media/cLZYVIRbpI6TsemLFw/giphy.gif";

  images[3] = new Image()
  images[3].src = "https://media.giphy.com/media/xUOwFRUH1foa66zvLq/giphy.gif";


  function spawnFood() {
    var canvas = document.getElementById("board");
    var ctx    = canvas.getContext("2d");

    var i;
    for (i = 0; i < images.length; i++) { 
      var positionx = Math.floor(Math.random() * (canvas.width - images[i].width));
      var positiony = Math.floor(Math.random() * (canvas.height - images[i].height));
      
      ctx.drawImage(images[i], positionx, positiony, 70, 60)
    }
  };

  function myTimeoutFunction()
  {
      spawnFood();
  }

  spawnFood()
  setInterval(myTimeoutFunction, 40000);


