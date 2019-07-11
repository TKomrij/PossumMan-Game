const canvas = document.getElementById("board");
const ctx    = canvas.getContext("2d");
ctx.fillStyle = 'white';
ctx.font = '18px serif';

let keys = {};
let score = 0;
let livesLeft = 3;
let collision = false;
let removeFood;
let badFood = []


canvas.width = window.innerHeight;
canvas.height = window.innerHeight

// Images
const possumImage = new Image();
possumImage.src = "https://media.giphy.com/media/xT0BKuZRyjpUQadEpq/giphy.gif";

// const foodImage1 = new Image();
// foodImage1.src = "https://media.giphy.com/media/dYwyN5xXBP5hSP77bo/giphy.gif";

// const foodImage2 = new Image()
// foodImage2.src = "https://media.giphy.com/media/1qfKSo9vsdZh70D4ZT/giphy.gif";

// const foodImage3 = new Image();
// foodImage3.src = "https://media.giphy.com/media/cLZYVIRbpI6TsemLFw/giphy.gif";

// const foodImage4 = new Image();
// foodImage4.src = "https://media.giphy.com/media/xUOwFRUH1foa66zvLq/giphy.gif";

const policeImage = new Image();
policeImage.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";


function createObject (object) {
  this.id = object.id;
  this.x = object.x;
  this.y = object.y;
  this.width = object.width;
  this.height = object.height;
  this.speed = object.speed;
  this.gravity = object.gravity;
  this.image = object.image
}

// possum
let possum = new createObject ({
  x: 25,
  y: 25,
  width: 90,
  height: 45,
  speed: 12,
})

// foods
let foods = []

let food1 = new createObject ({
  id: "food1",
  x: Math.floor(Math.random() * (canvas.width - 70)),
  y: Math.floor(Math.random()* (canvas.height - 70)),
  width: 90,
  height: 45,
  speed: 5,
  gravity: 1.4,
  image: new Image()
})
food1.image.src = "https://media.giphy.com/media/dYwyN5xXBP5hSP77bo/giphy.gif"

let food2 = new createObject ({
  id: "food2",
  x: Math.floor(Math.random() * (canvas.width - 70)),
  y: Math.floor(Math.random()* (canvas.height - 70)),
  width: 90,
  height: 45,
  speed: 2,
  gravity: 3,
  image: new Image()
})
food2.image.src = "https://media.giphy.com/media/1qfKSo9vsdZh70D4ZT/giphy.gif"

let food3 = new createObject ({
  id: "food3",
  x: Math.floor(Math.random() * (canvas.width - 70)),
  y: Math.floor(Math.random()* (canvas.height - 70)),
  width: 90,
  height: 45,
  speed: 2,
  gravity: 3,
  image: new Image()
})
food3.image.src = "https://media.giphy.com/media/cLZYVIRbpI6TsemLFw/giphy.gif"

let food4 = new createObject ({
  id: "food4",
  x: Math.floor(Math.random() * (canvas.width - 70)),
  y: Math.floor(Math.random()* (canvas.height - 70)),
  width: 90,
  height: 45,
  speed: 2,
  gravity: 3,
  image: new Image()
})
food4.image.src = "https://media.giphy.com/media/xUOwFRUH1foa66zvLq/giphy.gif"

foods.push(food1, food2, food3, food4)
var filterFoods = foods

// police
let police = new createObject({
  x: canvas.width - 100,
  y: canvas.height - 150,
  width: 90,
  height: 45,
  speed: 15,
})

///////
////////////////////
// Done:
// - make different trash objects appear on canvas 
// - move trash objects in random positions
// - add police 
// - collision possum - food
// - collision possum - police
// - collision food - canvas
// - foods stay and bounce within canvas
// - foods move at different velocity

// To Do Tatiane:
// - dissappear of trash if the collision is true
// - updatescoreboard/lives
// - police follow possum
// - police stay within canvas
// extra: start/reset game
// extra: collision food - food
// extra extra: evasion police - food

// Movement
window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  e.preventDefault();
})

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
})

function movement(possum) {
  // left
  if (37 in keys) {
      if(possum.x - possum.speed > 0) {
          possum.x -= possum.speed;
      }
      possum.direction = 'left';
  }
  // up
  if (38 in keys) {
      if(possum.y - possum.speed > 0) {
          possum.y -= possum.speed;
      }
      possum.direction = 'up'
  }
  // right
  if (39 in keys) {
      if(possum.x + possum.width +  possum.speed < canvas.width) {
          possum.x += possum.speed;
      }
      possum.direction = 'right';
  }
  // down
  if (40 in keys) {
      if(possum.y + possum.height + possum.speed < canvas.height) {
          possum.y += possum.speed;
      }
      possum.direction = 'down';
  }
}


// Collisions
// - Collision objects
function collisionObjects(obj1, obj2) {
  
  // collision possum - police
  if(obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y) {
       //debugger
      collision = true;
      // if(collision == true) {
        livesLeft --
        // update scoreboard
        console.log("Oh no! You got caught!");
            livesLeft --;
            document.getElementById("lives").innerText = livesLeft;
            return
      // };
      
    };

  // collision possum - food
  if(obj2 == foods) {
    for(i=0; i < obj2.length; i++ ) {
  
      if(obj1.x < obj2[i].x + obj2[i].width
      && obj1.x + obj1.width > obj2[i].x
      && obj1.y < obj2[i].y + obj2[i].height
      && obj1.y + obj1.height > obj2[i].y
      && badFood.indexOf(obj2[i]) == -1) {
        removeFood = obj2[i].id
        badFood.push(obj2[i])
        debugger
        collision = true;
        // if(collision == true) {
          // update scoreboard
          console.log("you got trash! Good job!");
            score ++;
            document.getElementById("eaten").innerText = score
            return
        // };
       
      };
    };
  };
}

  




// - Collision Foods - Wall
function collisionFoods (foods){
  foods.forEach(el => {

    if(el.x + el.speed > canvas.width - el.width || el.x + el.speed < 0) {
      el.speed = -el.speed
    }
    if(el.y + el.gravity > canvas.height - el.height || el.y + el.gravity < 0) {
      el.gravity = -el.gravity
    }
    el.x += el.speed;
    el.y += el.gravity;
  })
}

function slowMoveFoods (food1, food2, food3, food4) {
  
  food1.x += food1.speed;
  food1.y += food1.gravity;

  food2.x += food2.speed;
  food2.y += food2.gravity;

  food3.y += food3.speed;
  food3.y += food3.gravity;

  food4.y += food4.speed;
  food4.y += food4.gravity;
}

// Draw Images
function drawPossum(possum) {
  ctx.drawImage(possumImage, possum.x, possum.y, possum.width, possum.height);
}
function drawFood(foodImage, food) {
  ctx.drawImage(foodImage, food.x, food.y, food.width, food.height);
}
function drawPolice(police) {
  ctx.drawImage(policeImage, police.x, police.y, police.width, police.height);
}

function draw () {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  drawPossum(possum);
  if(collision == true) {
    filterFoods = filterFoods.filter(food => !(food.id == removeFood))
    for(i = 0; i < filterFoods.length; i++) {
      drawFood(filterFoods[i].image, filterFoods[i]);
    }
    //debugger
  } else {
    for(i = 0; i < foods.length; i++) {
      drawFood(foods[i].image, foods[i]);
    }
  }
  if(badFood.length > 0) {
    setTimeout(function() {
      console.log("ksjdfhskjdfhs")
      //debugger
      for(i = 0; i < badFood.length; i++) {
        drawFood(badFood[i].image, badFood[i]);
      }
      
    }, 1000)
  }
  drawPolice(police);
}

function updateCanvas() {
    movement(possum)
    draw();

    collisionObjects(possum, foods);
    collisionObjects(possum, police);

    collisionFoods(foods);
    slowMoveFoods(food1, food2, food3, food4);
   
    window.requestAnimationFrame(updateCanvas);
}
updateCanvas();







































// var canvas = document.getElementById("board");
// var ctx    = canvas.getContext("2d");
// ctx.fillStyle = 'white';
// ctx.font = '18px serif';

// var keys = {};
// var score = 0;
// var livesLeft = 3;
// var collision = false;
// var collision2 = false;

// canvas.width = window.innerHeight;
// canvas.height = window.innerHeight

// // Images
// const possumImage = new Image();
// possumImage.src = "https://media.giphy.com/media/xT0BKuZRyjpUQadEpq/giphy.gif";

// const foodImage1 = new Image();
// foodImage1.src = "https://media.giphy.com/media/dYwyN5xXBP5hSP77bo/giphy.gif";

// const foodImage2 = new Image()
// foodImage2.src = "https://media.giphy.com/media/1qfKSo9vsdZh70D4ZT/giphy.gif";

// const foodImage3 = new Image();
// foodImage3.src = "https://media.giphy.com/media/cLZYVIRbpI6TsemLFw/giphy.gif";

// const foodImage4 = new Image();
// foodImage4.src = "https://media.giphy.com/media/xUOwFRUH1foa66zvLq/giphy.gif";

// const policeImage = new Image();
// policeImage.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";


// function createObject (object) {
//   this.x = object.x;
//   this.y = object.y;
//   this.width = object.width;
//   this.height = object.height;
//   this.speed = object.speed;
//   this.gravity = object.gravity
// }

// // possum
// let possum = new createObject ({
//   x: 25,
//   y: 25,
//   width: 90,
//   height: 45,
//   speed: 12,
// })

// var dx = 2;
// var dy = -2;


// // foods
// let foods = []

// let food1 = new createObject ({
//   x: Math.floor(Math.random() * (canvas.width - 70)),
//   y: Math.floor(Math.random()* (canvas.height - 70)),
//   width: 90,
//   height: 45,
//   speed: 3,
//   gravity: 0.5
// })

// let food2 = new createObject ({
//   x: Math.floor(Math.random() * (canvas.width - 70)),
//   y: Math.floor(Math.random()* (canvas.height - 70)),
//   width: 90,
//   height: 45,
//   speed: 4,
//   gravity: 0.5
// })

// let food3 = new createObject ({
//   x: Math.floor(Math.random() * (canvas.width - 70)),
//   y: Math.floor(Math.random()* (canvas.height - 70)),
//   width: 90,
//   height: 45,
//   speed: 5,
//   gravity: 0.5
// })

// let food4 = new createObject ({
//   x: Math.floor(Math.random() * (canvas.width - 70)),
//   y: Math.floor(Math.random()* (canvas.height - 70)),
//   width: 90,
//   height: 45,
//   speed: 5,
//   gravity: 0.5
// })

// foods.push(food1, food2, food3, food4)

// // police
// let police = new createObject({
//   x: canvas.width - 100,
//   y: canvas.height - 150,
//   width: 90,
//   height: 45,
//   speed: 15,
// })

// ///////
// ////////////////////
// // Done:
// // - make different trash objects appear on canvas (V)
// // - move trash objects in random positions
// // - add police (V)

// // To Do Tatiane:
// // - dissappear of trash if the collision is true
// // - updatescoreboard/lives
// // - police follow possum
// // - police stay within boundary
// // - trash stay within boundary

// // Movement
// window.addEventListener("keydown", function (e) {
//   keys[e.keyCode] = true;
//   e.preventDefault();
// })

// window.addEventListener("keyup", function (e) {
//   delete keys[e.keyCode];
// })

// function movement(possum) {
//   // left
//   if (37 in keys) {
//       if(possum.x - possum.speed > 0) {
//           possum.x -= possum.speed;
//       }
//       possum.direction = 'left';
//   }
//   // up
//   if (38 in keys) {
//       if(possum.y - possum.speed > 0) {
//           possum.y -= possum.speed;
//       }
//       possum.direction = 'up'
//   }
//   // right
//   if (39 in keys) {
//       if(possum.x + possum.width +  possum.speed < canvas.width) {
//           possum.x += possum.speed;
//       }
//       possum.direction = 'right';
//   }
//   // down
//   if (40 in keys) {
//       if(possum.y + possum.height + possum.speed < canvas.height) {
//           possum.y += possum.speed;
//       }
//       possum.direction = 'down';
//   }
// }
// function movementPolice(police) {
//   police.x = possum.x && police.y == possum.x
// }

// function update() {
//   movement(possum)

// }

// // Scoreboard
// function updateScoreBoard() {
//   // scoreboard logic
//   if(collision == true) {
//     document.getElementById("eaten").innerHTML = score;
//     score ++;
//   }
//   else (collision2 == true) {
//     document.getElementById("eaten").innerHTML = score;
//     score -= 1
//   }
//   }
  
  


// // Collision Possum vs Food
// function collisionObjects(possum, food) {
//   if(possum.x < food.x + food.width
//     && possum.x + possum.width > food.x
//     && possum.y < food.y + food.height
//     && possum.y + possum.height > food.y) {
//       collision = true;
//     }
//       // call scoreboard 
//       updateScoreBoard()  
// }


// // Collision Possum vs Police
// function collisionObjects2(possum, police) {
//   if(possum.x < police.x + police.width
//     && possum.x + possum.width > police.x
//     && possum.y < police.y + police.height
//     && possum.y + possum.height > police.y) {
//       collision2 = true;
//   }
// }        
  

    



// function slowMoveFood (food1, food2, food3, food4) {
  
//   food1.x += food1.speed;
//   food1.y += food1.gravity;

//   food2.x -= food2.speed;
//   food2.y += food2.gravity;

//   food3.y -= food3.speed;
//   food3.y += food3.gravity;

//   food4.y -= food4.speed;
//   food4.y += food4.gravity;
// }

// // function fastMovePolice (police) {
// //   police.x -= police.speed;
// //   police.y -= police.speed;

// //   if(police.x - police.speed > 0) {
// //     police.x -= police.speed;
// //   }
// //   police.direction = 'left';


// //   if(police.y - police.speed > 0) {
// //   police.y -= police.speed;
// //   }
// //   police.direction = 'up'
  

// //   if(police.x + police.width  +  police.speed < canvas.width) {
// //     police.x += police.speed;
// // }
// // police.direction = 'right';

// // if(police.y + police.height + police.speed < canvas.height) {
// //   police.y += police.speed;
// // }
// // police.direction = 'down';
// // }




// // Draw Images
// function drawPossum(possum) {
//   ctx.drawImage(possumImage, possum.x, possum.y, possum.width, possum.height)
// }
// function drawFood(foodImage, food) {
//   ctx.drawImage(foodImage, food.x, food.y, food.width, food.height)
// }
// function drawPolice(police) {
//   ctx.drawImage(policeImage, police.x, police.y, police.width, police.height)
// }


// function draw () {
//   ctx.clearRect(0,0, canvas.width, canvas.height)
//   drawPossum(possum)
//   drawFood(foodImage1, food1)
//   drawFood(foodImage2, food2)
//   drawFood(foodImage3, food3)
//   drawFood(foodImage4, food4)
//   drawPolice(police)
//   collisionObjects(possum, foods)
//   slowMoveFood(food1, food2, food3, food4)
//   // fastMovePolice(police)
// }

// function updateCanvas() {
//     update()
//     draw()
//     window.requestAnimationFrame(updateCanvas)
// }
// updateCanvas()








