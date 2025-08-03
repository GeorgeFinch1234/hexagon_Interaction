const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gridSize = 20;
let clickXLocation = 0;
let clickYLocation = 0;

ctx.fillStyle = "rgb(0,0,0)"
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

/*
point is so class know how many time it has moves, so each click send say a line of and it does 3 movments
*/

class line {
    constructor(initialX, initialY) {
        this.X = initialX
        this.Y = initialY
        //basically a base case for recursion
        this.moveLeft = 35
    }
    drawHexagons() {
        draw(this.X, this.Y, this)
        this.moveLeft = this.moveLeft - 1;
        //so draws 3 lines
        if (!(this.moveLeft < 0)) {
            setTimeout(() => { this.drawHexagons() }, 15)
        }
    }
}


/*
basically sets where clint clicked then draws.
*/

addEventListener("click", (e) => {
    clickXLocation = e.clientX
    clickYLocation = e.clientY
    new line(clickXLocation, clickYLocation).drawHexagons()

})
addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.fillStyle = "rgb(0,0,0)"
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

})
/*
acceptance x, as in x is the location you want to know what chunk it fall into.
gets the chunk on the X axis at, 
returns a number between 0 and 5 indicating chunk on
*/
function chunkX(x) {
    /*
    Math.round-> this just makes it so using whole number to make life easier 
    x/gridsize -> without this the system would cycle every 6 pixels not every 6 chunks, this makes it work 
    on the chunks
    
    
    
    %6-> so get the actually grid chunk the user is on
    
    ideas is the hexagon are just lines of \__/-- (last one image at top)
    so get to know which segment of it at, can then tell it what options it has, there are 6 sections hence mod 6
    
    
    
    */

    return (Math.round(x / gridSize) % 6);

}
/*

same as chunkX but as line are off set return a 0 or 1
why of set so give illusion of hexagon which is what i want.
\__/--\__
   \__/--
*/
function chunkY(y) {
    return (Math.round(y / gridSize) % 2);
}

/*
x and y are the start location, line is an object so can update it for next run
*/
function draw(X, Y, Line) {
    /*
Math.ceil - >rounds up so whole number 
Math.ceil(clickXLocation/gridSize) - >put it on the grid, 
*gridSize -> so goes back to nearest neigbour

    */


    let positionY = Math.ceil(Y / gridSize) * gridSize
    let positionX = Math.ceil(X / gridSize) * gridSize


    ctx.moveTo(positionX, positionY)
    let gridX = chunkX(positionX);
    let gridY = chunkY(positionY);
    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    /*
\__/--\__
0 \
1_
2_
3/
4-
5-


0 can go, lef, rightup right down
1 can go right, left up, left down 
2 can go left or right 
3 can go left, right up, or right down
4 can go right, left down, left up
5 can go right or left


    */
    //return 1,2 or3 eg the options that we have. it rounded so can used as whole int
    let pickingThree = Math.round(Math.random() * 3)

    let pickingTwo = Math.round(Math.random() * 2)
    if (gridX == 0) {
        /*
off set need to be by 3 places so if gridY = 1 then 0 = 3,1=4,2=5 and so on
why 
as each row is just \__/-- to keep life simple
        */

        if (gridY == 0) {

            /*
          \__/--\__
            0 can go, lef, rightup right down
              */

            if (pickingThree == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            } else if (pickingThree == 2) {
                //right up
                ctx.lineTo(positionX + gridSize, positionY - gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY - gridSize
            } else {
                //right down
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            }

        } else {
            ctx.moveTo(positionX, positionY + gridSize)
            /*
      \__/--\__
     3 can go left, right up, or right down
          */

            if (pickingThree == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else if (pickingThree == 2) {
                //right up
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else {
                //right down
                ctx.lineTo(positionX + gridSize, positionY + gridSize + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize + gridSize
            }


        }


    } else if (gridX == 1) {

        if (gridY == 0) {

            /*
       \__/--\__
        1 can go right, left up, left down 
         
        ideas is intial click get top line as starting point
        so as want to start lower have to ajust for that
        */
            ctx.moveTo(positionX, positionY + gridSize)
            if (pickingThree == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            } else if (pickingThree == 2) {
                //left up
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            } else {
                //left down
                ctx.lineTo(positionX - gridSize, positionY + gridSize + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY - gridSize + gridSize
            }

        } else {

            /*
       \__/--\__
       4 can go right, left down, left up
           */

            if (pickingThree == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else if (pickingThree == 2) {
                //left down
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else {
                //left up
                ctx.lineTo(positionX - gridSize, positionY - gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY - gridSize
            }


        }




    } else if (gridX == 2) {
        if (gridY == 0) {

            /*
    \__/--\__
    2 can go left or right 
    */
            ctx.moveTo(positionX, positionY + gridSize)
            if (pickingTwo == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else {
                //right
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            }
        } else {
            /*
        \__/--\__
        5 can go right or left
            */

            if (pickingTwo == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else {
                //left
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            }
        }
    } else if (gridX == 3) {
        if (gridY == 0) {

            ctx.moveTo(positionX, positionY + gridSize)
            /*
      \__/--\__
     3 can go left, right up, or right down
          */

            if (pickingThree == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else if (pickingThree == 2) {
                //right up
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else {
                //right down
                ctx.lineTo(positionX + gridSize, positionY + gridSize + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize + gridSize
            }






        } else {

            /*
          \__/--\__
            0 can go, lef, rightup right down
              */

            if (pickingThree == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            } else if (pickingThree == 2) {
                //right up
                ctx.lineTo(positionX + gridSize, positionY - gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY - gridSize
            } else {
                //right down
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            }
        }


    }

    else if (gridX == 4) {
        if (gridY == 0) {

            /*
       \__/--\__
       4 can go right, left down, left up
           */

            if (pickingThree == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else if (pickingThree == 2) {
                //left down
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else {
                //left up
                ctx.lineTo(positionX - gridSize, positionY - gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY - gridSize
            }

        } else {

            /*
       \__/--\__
        1 can go right, left up, left down 
         
        ideas is intial click get top line as starting point
        so as want to start lower have to ajust for that
        */
            ctx.moveTo(positionX, positionY + gridSize)
            if (pickingThree == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            } else if (pickingThree == 2) {
                //left up
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            } else {
                //left down
                ctx.lineTo(positionX - gridSize, positionY + gridSize + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize + gridSize

            }
        }
    }


    else if (gridX == 5) {
        if (gridY == 0) {

            /*
        \__/--\__
        5 can go right or left
            */

            if (pickingTwo == 1) {
                //right
                ctx.lineTo(positionX + gridSize, positionY);
                Line.X = positionX + gridSize

            } else {
                //left
                ctx.lineTo(positionX - gridSize, positionY);
                Line.X = positionX - gridSize

            }


        } else {

            /*
    \__/--\__
    2 can go left or right 
    */
            ctx.moveTo(positionX, positionY + gridSize)
            if (pickingTwo == 1) {
                //left
                ctx.lineTo(positionX - gridSize, positionY + gridSize);
                Line.X = positionX - gridSize
                Line.Y = positionY + gridSize
            } else {
                //right
                ctx.lineTo(positionX + gridSize, positionY + gridSize);
                Line.X = positionX + gridSize
                Line.Y = positionY + gridSize
            }
        }


    } else {

    }




    ctx.stroke();
}