// game board
function draw() {
  var canvas = document.getElementById("board");
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');

    roundedRect(ctx, 12, 12, 800, 800, 15);
    roundedRect(ctx, 19, 19, 800, 800, 9);
    roundedRect(ctx, 53, 53, 49, 33, 10);
    roundedRect(ctx, 53, 119, 49, 16, 6);
    roundedRect(ctx, 135, 53, 49, 33, 10);
    roundedRect(ctx, 135, 119, 25, 49, 10);
    

  };
};

draw()
 
 
