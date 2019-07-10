var canvas = document.getElementById("board");
var ctx    = canvas.getContext("2d");
ctx.fillStyle = 'white';
ctx.font = '18px serif';

canvas.width = window.innerHeight;
canvas.height = window.innerHeight

// character possum
let possum = {
  x: 25,
  y: 25,
  width: 70,
  height: 25,
  speed: 25,
}



// character police
// let police = {
//   x: 450,
//   y: 450,
//   vx: 5,
//   vy: 2,
//   width: 50,
//   height: 50,
//   speed: 25,
// }

// let police2 = {
//   x: 550,
//   y: 450,
//   vx: 5,
//   vy: 2,
//   width: 50,
//   height: 50,
//   speed: 25,
// }

// let police3 = {
//   x: 350,
//   y: 450,
//   vx: 5,
//   vy: 2,
//   width: 50,
//   height: 50,
//   speed: 25,
// }

// Movement Possum
document.onkeydown = function(e) {
  e.preventDefault();
  switch (e.keyCode) {

    // left
    case 37: 
    if(possum.x - possum.speed > 0 ) {
        possum.x -= possum.speed
    } 
    break;

    // up
    case 38: 
    if(possum.y - possum.speed > 0  ) {
      possum.y -= possum.speed
    } 
    break;
    
    // right
    case 39: 
    if(possum.x + possum.width + possum.speed  < canvas.width ) {
      possum.x += possum.speed
    } 
    break;
   
    // down
    case 40: 
    if (possum.y + possum.height + possum.speed < canvas.height) {
        possum.y += possum.speed
    }
    break;
  }
  updateCanvas()
}

// Draw objects on canvas
// - Possum
function drawPossum(possum) {
  var img = new Image();
      img.onload = function() { 
          ctx.drawImage(img, possum.x, possum.y, 70, 30); 
      }
      img.src = "https://media.giphy.com/media/xT0BKuZRyjpUQadEpq/giphy.gif";
  }
  
  // - Police
  // function drawPolice(police) {
  //     var img = new Image()
  //     img.onload = function () {
  //         ctx.drawImage(img, police.x, police.y, 70, 40 )
  //     }
  //     img.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";
  // }

  // function drawPolice2(police2) {
  //   var img = new Image()
  //   img.onload = function () {
  //       ctx.drawImage(img, police2.x, police2.y, 70, 40 )
  //   }
  //   img.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";
  // }

  // function drawPolice3(police3) {
  //   var img = new Image()
  //   img.onload = function () {
  //       ctx.drawImage(img, police3.x, police3.y, 70, 40 )
  //   }
  //   img.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";
  // }

  

  // Update canvas
function updateCanvas() {
  //ctx.clearRect(0,0,1800,1800);
  ctx.clearRect(possum.x-possum.width/3,possum.y-possum.height/1.2,possum.width*1.8,possum.height*3);
  drawPossum(possum)
  // drawPolice(police)
  // drawPolice2(police2)
  // drawPolice3(police3)
}

updateCanvas();






  