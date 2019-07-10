// function Random(range) {
//   return Math.floor((Math.random() * range) + 1);
//   }

//   //Create viewport that holds all the graphics objects (bouncing balls) 
//   //and triggers the paint event at frame rate 40/s
//   var viewport = new Viewport();
  
//   //Create hundred bouncing balls with random location, random direction
//   //and random speed. Add those balls to viewport using addObject function
//   //that is defined in viewport object
//   for (var i = 0; i < 3; i++) {
//   var ball = new BouncingBall();
//   ball.location = { x: Random(window.innerWidth - 32), y: Random(window.innerHeight - 32) };
//   ball.direction = { x: Random(1), y: Random(1) };
//   ball.speed = Random(5)+2;
//   viewport.addObject(ball);
//   }
  
//   //Start rendering by calling init function of viewport object      
//   viewport.init();

//   function Viewport() {
//     var me = this;
    
//     //Initialize objects collection 
//     me.objects = [];
    
//     var canvas = document.getElementById("board");
    
//     // function that resizes the canvas to window size whenever required
//     // xs
    
//     //get the canvas context to draw 2d objects
//     var board = document.getElementById("board").getContext("2d");
    
//     //create the background image for the viewport
//     var image = new Image();
//     image.src = "background.png";
//     image.onload = function () {
//     me.backgroundImage = image;
//     me.doPaint = true;
//     }
    
//     me.doPaint = true;
    
//     //Function that paints the background image
//     function drawBackgroundImage() {
//     if (me.backgroundImage) {
//     board.drawImage(me.backgroundImage, 0, 0, canvas.width, canvas.height);
//     }
//     }
    
//     //Function that triggers the paint event for all the objects in the collection
//     function drawObjects() {
//     for (var i = 0; i < me.objects.length; i++) {
//     me.objects[i].paint(board);
//     }
//     }

//     //paintInit funtion is invoked before paint event. If doPaint is false,
//     //it will not trigger the paint event for child objects.
//     me.paintInit = function () {
//     me.doPaint = true;
//     }
    
//     //paint function is triggered at rate 40 /s to create the animation
//     function paint() {
//     me.paintInit();
//     if (me.doPaint) {
//     drawBackgroundImage();
//     drawObjects();
//     me.doPaint = false;
//     }
//     }
    
    
//     var timer;
//     //start the animation
//     me.init = function () {
//     timer = setInterval(function () { paint(); }, 1000 / 40);
//     };
    
//     me.repaint = function () {
//     me.doPaint = true;
//     };
    
//     //adds the object into collection
//     me.addObject = function (obj) {
//     me.objects.push(obj);
//     }      
//     }

//     function BouncingBall() {
//       var me = this;
//       me.speed = 5;
//       me.location = { x: 0, y: 0 };
//       var image = new Image();
//       image.src = "https://media.giphy.com/media/l0Iy8RHyESNYq2FcA/giphy.gif";
//       image.onload = function () {
//       me.image = image;
      
//       }
//       me.move = function () {
//       var ball = me;
//       switch (ball.direction.x) {
//       case 0:
//       if (ball.location.x <= 0) {
//       ball.direction.x = 1;
//       ball.location.x += ball.speed;
//       }
//       else {
//       ball.location.x -= ball.speed;
//       }
//       break;
//       case 1:
//       if (ball.location.x >= window.innerWidth - 32) {
//       ball.direction.x = 0;
//       ball.location.x -= ball.speed;
//       }
//       else {
//       ball.location.x += ball.speed;
//       }
//       break;
//       }
//       switch (ball.direction.y) {
//       case 0:
//       if (ball.location.y <= 0) {
//       ball.direction.y = 1;
//       ball.location.y += ball.speed;
//       }
//       else {
//       ball.location.y -= ball.speed;
//       }
//       break;
//       case 1:
//       if (ball.location.y >= window.innerHeight - 32) {
//       ball.direction.y = 0;
//       ball.location.y -= ball.speed;
//       }
//       else {
//       ball.location.y += ball.speed;
//       }
//       break;
//       }
//       }
//       me.paint = function (context) {
//       if (me.image) {
//       me.move();
//       context.drawImage(me.image, me.location.x, me.location.y);
//       }
//       }
//       }