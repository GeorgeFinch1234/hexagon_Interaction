const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
const gridSize =20;
let clickXLocation=0;
let clickYLocation=0;

/*
bascially sets where clint clicked then draws.
*/
addEventListener("click", (e) => {
   clickXLocation = e.clientX
    clickYLocation = e.clientY
draw()
})

/*
acceptace x, as in x is the lovation you want to know what chunk it fall into.
gets the chunk on the X axies at, 
returns a number between 0 and 5 indicating chunk on
*/
function chunkX(x){
/*
Math.round-> this justy makes it so using whole number to make life easier 
x/gridsize -> without this the systemt would cicyle every 6 pixles not evey 6 chunks, this makes it work 
on the chunks



%6-> so get the acaully grid chunk the user is on

ideas is the hexagon are just lines of \__/-- (last one image at top)
so get to know which segment of it at, can then tell it what options it has, there are 6 sections hence mod 6



*/
 return (Math.round(x / gridSize) % 6);

}
/*

same as chunkX but as line are off set return a 0 or 1
why of set so give illusion of hexigon which is what i want.
\__/--\__
   \__/--
*/
function chunkY(y){
    return (Math.round( y/ gridSize) % 2);
}


function draw(){
    /*
Math.ceil - >rounds up so whole number 
Math.ceil(clickXLocation/gridSize) - >put it on the grid, 
*gridSize -> so goes back to nearest neigbour

    */

 
 let postionY = Math.ceil(clickYLocation/gridSize)*gridSize
 let postionX = Math.ceil(clickXLocation/gridSize)*gridSize


  ctx.moveTo(postionX,postionY)
let gridX = chunkX(postionX) ;
let gridY = chunkY(postionY);
 ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
 
    
    
 ctx.lineTo(gridX,gridY);
   
  
   ctx.stroke();
}