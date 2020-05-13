var canvas = document.getElementById("myCanvasPaddle");
var cxtx = canvas.getContext("2d");

var paddleHeight = 50;
var paddleWidth = 15;
var xLeft = 0;
var yLeft = 160;
var dyLeft = 4;
var xright = canvas.width - paddleWidth;
var yright = 180;
var dyright = - 4;
var ballRadius = 8;
var dxBall = -3;
var dyBall = 2;
var xBall = canvas.width/2;
var yBall = Math.floor(Math.random()*canvas.height);
var arrowUpPressed = false;
var arrowDownPressed = false;
var scoreRigth = 0;
var scoreLeft = 0;
var limSupLeft = false;
var limInfLeft = false;
var countVelocity = 1;


document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

function limitesLeft(){
    if(yLeft + dyLeft == 0){
        limSupLeft = True;
    }else if(yLeft + paddleHeight == canvas.height){
        limInfLeft = True;
    }
}

function keyUpHandler(e){
    if(e.keyCode == 38){
        arrowUpPressed = false
    }
    else if(e.keyCode == 40){
        arrowDownPressed = false
    }
}

function keyDownHandler(e){
    if(e.keyCode == 38){
        arrowUpPressed = true
    }
   if(e.keyCode == 40){
       arrowDownPressed = true
   }
}

function drawPaddleLeft(){
    cxtx.beginPath();
    cxtx.rect(xLeft,yLeft,paddleWidth,paddleHeight)
    cxtx.fillStyle = "Black";
    cxtx.fill();
    cxtx.closePath();
}

function drawPaddleRight(){
    cxtx.beginPath();
    cxtx.rect(xright,yright,paddleWidth,paddleHeight)
    cxtx.fillStyle = "Black";
    cxtx.fill();
    cxtx.closePath();
}

function drawBall(){
    cxtx.beginPath();
    cxtx.arc(xBall,yBall,ballRadius,0,Math.PI*2,false)
    cxtx.fillStyle = "Black";
    cxtx.fill();
    cxtx.closePath();
}


function drawScore() {
    cxtx.font = "16px Arial"
    cxtx.fillStyle = "black"
    cxtx.fillText("Score: "+scoreLeft+" - "+scoreRigth, (canvas.width/2) - 50, 20)
}

function moveAll() {
    cxtx.clearRect(0, 0, canvas.width, canvas.height);
    
    limSupLeft = false;
    limInfLeft = false;

    drawPaddleLeft();
    drawPaddleRight();
    drawBall();
    drawScore(); 
    limitesLeft()

    if(arrowUpPressed && yright > 0){
        yright += dyright
    }
    
    if(arrowDownPressed && yright + paddleHeight < canvas.height){
        yright += - dyright
    }

 
      
        switch (limSupLeft) {
            case false:
                if( yLeft + dyLeft > yBall ){
                yLeft -= dyLeft;
                }
                break;
        }

        switch (limInfLeft) {
            case false:
                if( yLeft + paddleHeight - dyLeft < yBall  ){
                yLeft += dyLeft;
                }
                break;
        }
   
    if(yBall > canvas.height - ballRadius || yBall < ballRadius){
        dyBall = -dyBall
    } 

    if (xBall == canvas.width - paddleWidth - dxBall){
        if(yBall > yright && yBall < yright+paddleHeight){
        dxBall = -dxBall
        dyBall = dyBall   
        } else if(xBall < canvas.width){
                xBall += dxBall;
                yBall += dyBall;
        }
    }
   
    if(xBall > canvas.width+ballRadius){
                    alert("Gol!! El jugador de la izquierda suma 1 punto");
                    
                    xBall = canvas.width/2;
                    yBall = Math.floor(Math.random()*300);
                    document.location.reload();
   } 
    
    if(xBall == paddleWidth){
        if(yLeft+paddleHeight < yBall < yLeft){
            dxBall = -dxBall
             
       
        } else if(xBall > paddleWidth){
            xBall += dxBall;
            yBall += dyBall;
        }
    } 

    if(xBall < -ballRadius){
        alert("Gol!! El jugador de la derecha suma 1 punto");
        scoreRigth += 1;
        xBall = canvas.width/2;
        yBall = Math.floor(Math.random()*300);
        document.location.reload();
}

    
    xBall += dxBall ;
    yBall += dyBall;
}

setInterval(moveAll,10);

