// canvas-------------------------------------------------------------------------------

const canvas = document.getElementById("board");
const ctx    = canvas.getContext("2d");
ctx.fillStyle = 'white';
ctx.font = '18px serif';

canvas.width = window.innerHeight;
canvas.height = window.innerHeight

// global-------------------------------------------------------------------------------

let keys = {};

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

// Images-------------------------------------------------------------------------------

const possumImage = new Image();
possumImage.src = "https://media.giphy.com/media/xT0BKuZRyjpUQadEpq/giphy.gif";


const policeImage = new Image();
policeImage.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";


// possum-------------------------------------------------------------------------------

let possum = new createObject ({
  x: 25,
  y: 25,
  width: 90,
  height: 45,
  speed: 12,
})

// foods--------------------------------------------------------------------------------

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

// police-------------------------------------------------------------------------------

let police = new createObject({
  x: canvas.width - 100,
  y: canvas.height - 150,
  width: 90,
  height: 45,
  speed: 5,
})

// Movement Possum----------------------------------------------------------------------

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

//movement police-----------------------------------------------------------------------

function chase(police) {
  if(possum.x < police.x){
    police.x -= police.speed;
  }
  if(possum.x > police.x){
    police.x += police.speed;
  }
  if(possum.y < police.y){
      police.y -= police.speed;
  }
  if(possum.y > police.y){
    police.y += police.speed;
  }
}

// Collision objects--------------------------------------------------------------------

let score = 0;
let livesLeft = 25;
let collision = false;
let removeFood;
let badFood = []
let policeCtrl = []

function collisionObjects(obj1, obj2) {
  // collision possum - police
  if(obj1.x < obj2.x + obj2.width
    && obj1.x + obj1.width > obj2.x
    && obj1.y < obj2.y + obj2.height
    && obj1.y + obj1.height > obj2.y) {
      //collision = true;
      if(policeCtrl.indexOf(obj2) == -1) {
        policeCtrl.push(obj2)
        livesLeft --
        // update scoreboard
        console.log("Oh no! You got caught!");
        //livesLeft --;
        document.getElementById("lives").innerText = livesLeft;
        if(livesLeft == 0) {
          alert("Oh no! You got caught!")
          location.reload(true)
        };
        // return
      }
        setTimeout(()=> {
          policeCtrl = []
        }, 2000)
    };

  // collision possum - food------------------------------------------------------------

  if(obj2 == foods) {
    for(i=0; i < obj2.length; i++ ) {
  
      if(obj1.x < obj2[i].x + obj2[i].width
      && obj1.x + obj1.width > obj2[i].x
      && obj1.y < obj2[i].y + obj2[i].height
      && obj1.y + obj1.height > obj2[i].y
      && badFood.indexOf(obj2[i]) == -1) {
        removeFood = obj2[i].id
        badFood.push(obj2[i])
        collision = true;
        // if(collision == true) {
          // update scoreboard
          console.log("you got trash! Good job!");
            score ++;
            document.getElementById("eaten").innerText = score
            if(score == 50) {
              alert("You're a rootin' and tootin' possum!")
              location.reload(true)
            }
            return
        
       
      };
    };
  };
};


// - Collision Foods - Wall-------------------------------------------------------------

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

// Draw Images--------------------------------------------------------------------------

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


  filterFoods = filterFoods.filter(food => !(food.id == removeFood))

  for(i = 0; i < filterFoods.length; i++) {
    drawFood(filterFoods[i].image, filterFoods[i]);
  }
  if(collision) {
    setTimeout(()=> {
      let removedFood = foods.filter(food => (food.id == removeFood));
      removeFood = undefined
      badFood = [];
      if(removedFood[0]) {
        filterFoods.push(removedFood[0]);
      }
    }, 2000)
  }
  collision = false;

  drawPolice(police);
}

function updateCanvas() {
    movement(possum)
    draw();
    chase(police);

    collisionObjects(possum, foods);
    collisionObjects(possum, police);

    collisionFoods(foods);
    slowMoveFoods(food1, food2, food3, food4);
   
    window.requestAnimationFrame(updateCanvas);
}
updateCanvas();



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
// - dissappear of trash if the collision is true
// - updatescoreboard/lives
// - police follow possum
// - police stay within canvas
// extra: start/reset game































