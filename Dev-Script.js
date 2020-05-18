var canvas = document.getElementById("myCanvasPaddle");
var cxtx = canvas.getContext("2d");
var arrowUpPressed = false;
var arrowDownPressed = false;

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)


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


//Dibujamos paletas + bola + texto

function drawRect(x, y, w, h, color){
    cxtx.fillstyle = color;
    cxtx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
   
    cxtx.beginPath();
    cxtx.arc(x, y, r, 0, Math.PI*2, false);
    cxtx.fillstyle = color;
    cxtx.fill();
    cxtx.closePath();
}

function drawScore() {
    cxtx.font = "16px Fantasy"
    cxtx.fillText("Score: "+user.score+" - "+com.score, (canvas.width/2) - 50, 20)
}



// Paletas user y computer, y bola, son OBJETOS

const user = {
    x:0,
    y: (canvas.height/2) - 50/2,
    width: 20,
    height: 75,
    color: "Black",
    score: 0,

}

const com = {
    width: 20,
    height: 75,
    x: canvas.width - 20,
    y: (canvas.height/2) - 50/2,
    color: "Black",
    score: 0,
}

const ball = {
    x : canvas.width/2 ,
    y : canvas.height/2,
    r: 8,
    speed: 5 ,
    VelocityX: 5 ,
    VelocityY:2 ,
    color: "Black",
}

// const ScoreText = {
//     text: user.score,
//     x: canvas.width/4,
//     y: canvas.height/5,
//     colorscore: "Black",
// }




//Movimientos:

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = 5;
    ball.VelocityX = -ball.VelocityX;
}


let rectX = 0;

function render(){
//borro el contenido del canvas
cxtx.clearRect(0, 0, canvas.width, canvas.height);

//dibujo el score de cada participante
drawScore();

//dibujo las paletas y la bola
drawRect(user.x, user.y, user.width,user.height,user.color)
drawRect(com.x, com.y, com.width,com.height,com.color)
drawCircle(ball.x, ball.y, ball.r, ball.color)

// rectX = rectX + 100;

}


function collision(b,p){
    b.top = b.y - b.r;
    b.bottom = b.y + b.r;
    b.left = b.x - b.r;
    b.right = b.x + b.r;
   
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;



    return b.right > p.left && b.bottom > p.top && b.top < p.bottom && b.left < p.right;
}



function update(){
    ball.x += ball.VelocityX
    ball.y += ball.VelocityY
    
    if(ball.y + ball.r > canvas.height || ball.y - ball.r < 0){
        ball.VelocityY = - ball.VelocityY;
    }

    let computerLevel = 0.02

   
     com.y += (ball.y - (com.y + com.height/2))* computerLevel;
   
    

    let player = user
    let direction = 1
     if(ball.x > canvas.width/2){
       player = com;
       direction = -1;
     } 

   
  if(collision(ball, player)){
      
    // collisionPoint es la posicion de la paleta donde pega la pelota
    // es 0 si pega en el medio de la paleta, -height/2 de la paleta en esquina sup
    // y height/2 de la paleta en esq inf

        let collisionPoint = (ball.y - (player.y + player.height/2));
    // Ahora normalizo collisionPoin entre -1 y 1:

            collisionPoint = collisionPoint/(player.height/2);
    
    //Y ahora ese punto entre -1 y 1 pasa a ser un ángulo entre -45 y 45
    //pero en radianes (45° --> π/4)

        let angleRad = (Math.PI/4)*collisionPoint;

        ball.VelocityX = direction * ball.speed * Math.cos(angleRad);
        ball.VelocityY = ball.speed * Math.sin(angleRad);
        
        ball.speed += 0,1;

    }
    
    
    // console.log(ball)
    // console.log("b.right: "+ball.right+" > "+player.left) 
    // console.log(player)
    // console.log(player.left)
    // console.log(ball.right)
    // console.log(player.bottom)
    // console.log(collision(ball,player))

    if(ball.x  < ball.r){
        com.score++;
        resetBall();
    }else if( ball.x > canvas.width){
        user.score++
        resetBall();
    }

    if(arrowUpPressed && user.y > 0){
        user.y -= 5;
    }
    
    if(arrowDownPressed && user.y + user.height < canvas.height){
        user.y += 5;
    }
}

function game(){
    render(); //dibuja
    update(); //Para controlar movimientos, colisiones, act. de score, etc.
  
}

const framePerSecond = 50;

setInterval(game, 1000/framePerSecond)

// game()
// console.log(ball.VelocityX)
// console.log(ball.VelocityY)

