var canvas = document.getElementById("myCanvasPaddle");
var cxtx = canvas.getContext("2d");
var pauseButton = document.getElementById("Start-Pause")
var restartGame = document.getElementById("Reiniciar")
var upLevel = document.getElementById("upLevel")
var downLevel = document.getElementById("downLevel")
var levelName = document.getElementById("levelTitle")
var iconChange = document.getElementById("iconChange")
var LevelBallSpeed = 5

var level = 1

var arrowUpPressed = false;
var arrowDownPressed = false;

document.addEventListener("mousemove",mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)
canvas.addEventListener("click",pauseWithMouse, false)
pauseButton.addEventListener("click",pauseStart, false)
restartGame.addEventListener("click", restartGameFunction,false)

// upLevel.addEventListener("click", levelChange, false)
// downLevel.addEventListener("click", levelChange ,false)

function mouseMoveHandler(e){
    var relativeY = e.clientY - canvas.offsetTop;
    if(pauseButton == false){
        if(relativeY > 0 && relativeY < user.height){
            user.y = 0
            } else if(relativeY < canvas.height && relativeY > canvas.height - 1*user.height/10){
            user.y = canvas.height - user.height
            }else if(relativeY > 0 && relativeY < canvas.height - 1*user.height/10){
            user.y = relativeY - user.height;
        }
    }
}


function keyUpHandler(e){
    if(e.keyCode == 38){
        arrowUpPressed = false
    }
    else if(e.keyCode == 40){
        arrowDownPressed = false
    }
    if(e.keyCode == 13){
        pauseStart();
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

function pauseStart(){
    if (pauseButton){
        pauseButton = false
     
    }else{
        pauseButton = true

    }
}

function restartGameFunction() {
    user.score = 0
    user.y = (canvas.height/2) - 75/2
    com.score = 0
    com.y = (canvas.height/2) - 75/2;
    pauseButton = true
    resetBall();
}

function changeUpLevel(){
    switch (level) {
        case 1:
            level++
            levelName.innerHTML = "Level: Medium"
            LevelBallSpeed = 6
            break;
        case 2:
            level++
            levelName.innerHTML = "Level: Hard"
            LevelBallSpeed = 7
            break;
        case 3:
            level++
            levelName.innerHTML = "Level: Super Hard"
            LevelBallSpeed = 8
        break;
        case 4:
            level++
            levelName.innerHTML = "Level: Monster!!!"
            LevelBallSpeed = 10
        break;
        // case 5:
        //     level++
        //     levelName.innerHTML = "Level: Batata"
        // break;                
        default:
            break;
    }
}

function changeDownLevel(){
    switch (level) {
        case 2:
            level--
            levelName.innerHTML = "Level: Easy"
            LevelBallSpeed = 5
            break;
        case 3:
            level--
            levelName.innerHTML = "Level: Medium"
            LevelBallSpeed = 6
            break;
        case 4:
            level--
            levelName.innerHTML = "Level: Hard"
            LevelBallSpeed = 7
        break;
        case 5:
            level--
            levelName.innerHTML = "Level: Super Hard!!!"
            LevelBallSpeed = 8
        break;
        // case 5:
        //     level++
        //     levelName.innerHTML = "Level: Batata"
        // break;                
        default:
            break;
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

// const levels = {
//     levelString: "easy",
//     LevelBallSpeed: 5,
//     computerLevel: 0.1,
// }

const com = {
    x:0,
    y: (canvas.height/2) - 75/2,
    width: 20,
    height: 75,
    color: "Black",
    score: 0,

}

const user = {
    width: 20,
    height: 75,
    x: canvas.width - 20,
    y: (canvas.height/2) - 75/2,
    color: "Black",
    score: 0,
}

// user.onclick = pauseWithMouse(event);

function pauseWithMouse() {
    if (pauseButton){
        pauseButton = false
     }else{
        pauseButton = true
    }
}


const ball = {
    x : canvas.width/2 ,
    y : canvas.height/2,
    r: 8,
    speed: LevelBallSpeed ,
    VelocityX: LevelBallSpeed * Math.cos(Math.PI/4) ,
    VelocityY: LevelBallSpeed * Math.cos(Math.PI/4) ,
    color: "Black",
}

// const ScoreText = {
//     text: user.score,
//     x: canvas.width/4,
//     y: canvas.height/5,
//     colorscore: "Black",
// }




//Movimientos:

function askLevelBallSpeed(){
   
    switch (level) {
        case 1:
            computerLevel = 0.1
            LevelBallSpeed = 5
            break;
        case 2:
            computerLevel = 0.2
            LevelBallSpeed = 6
            break;
        case 3:
            computerLevel = 0.3
            LevelBallSpeed = 7
            break;
        case 4:
            computerLevel = 0.4
            LevelBallSpeed = 8
            break;
        case 5:
            computerLevel = 0.5
            LevelBallSpeed = 10
        break;
        default:
            break;
    }
}

function resetBall(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.speed = LevelBallSpeed;
    ball.VelocityX = -ball.VelocityX;
    user.y = canvas.height/2 - user.height/2
    com.y = canvas.height/2 - com.height/2
}



function render(){
//borro el contenido del canvas


cxtx.clearRect(0, 0, canvas.width, canvas.height);

//dibujo el score de cada participante
drawScore();

//dibujo las paletas y la bola
drawRect(user.x, user.y, user.width,user.height,user.color)
drawRect(com.x, com.y, com.width,com.height,com.color)

askLevelBallSpeed();
drawCircle(ball.x, ball.y, ball.r, ball.color)

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
    
    if(ball.y + ball.r + ball.VelocityY > canvas.height){
        ball.y = canvas.height - (ball.r*1.2)
        ball.VelocityY = - ball.VelocityY;

    }else if(ball.y - ball.r - + ball.VelocityY < 0){
        ball.y = (ball.r*1.2)
        ball.VelocityY = - ball.VelocityY;

    }

    // let computerLevel = 0.02
        
    var computerMove = (ball.y - (com.y + com.height/2)) * computerLevel;

    if(com.y + computerMove > 0 && com.y + com.height + computerMove < canvas.height){
        com.y += computerMove
    }

    let player = com
    let direction = 1
     if(ball.x > canvas.width/2){
       player = user;
       direction = -1;
     } 

    

  if(collision(ball, player)){
        // collisionPoint es la posicion de la paleta donde pega la pelota
        // es 0 si pega en el medio de la paleta, -height/2 de la paleta en esquina sup
        // y height/2 de la paleta en esq inf
            askLevelBallSpeed();
            ball.speed = LevelBallSpeed;
            
            let collisionPoint = (ball.y - (player.y + player.height/2));
        // Ahora normalizo collisionPoin entre -1 y 1:

                collisionPoint = collisionPoint/(player.height/2);
        
        //Y ahora ese punto entre -1 y 1 pasa a ser un ángulo entre -45 y 45
        //pero en radianes (45° --> π/4)

            let angleRad = (Math.PI/4)*collisionPoint;

            ball.VelocityX = direction * ball.speed * Math.cos(angleRad);
            ball.VelocityY = ball.speed * Math.sin(angleRad);
            
          

            ball.speed += 0.1;
    }
    
    

    if(ball.x  < ball.r){
        com.score++;
        resetBall();
        pauseButton = true;
    }else if( ball.x > canvas.width){
        user.score++
        resetBall();
        pauseButton = true;
    }

    if(arrowUpPressed && user.y > 0){
        switch (level) {
            case 1:
                user.y -= 5;
                break;
            case 2:
                user.y -= 8;
                break;
            case 3:
                user.y -= 10;
                break;          
            default:
                user.y -= 12
                break;
        }
        
    }
    
    if(arrowDownPressed && user.y + user.height < canvas.height){
        switch (level) {
            case 1:
                user.y += 5;
                break;
            case 2:
                user.y += 8;
                break;
            case 3:
                user.y += 10;
                break;          
            default:
                user.y += 12
                break;
        }
    }

    ball.x += ball.VelocityX
    ball.y += ball.VelocityY
    
}

function game(){
            
    if(pauseButton){
    //askLevelBallSpeed()
    render();
    }else{
    // askLevelBallSpeed();
    render(); //dibuja
    update(); //Para controlar movimientos, colisiones, act. de score, etc.
    }
    // console.log(ball.speed)
    // console.log(LevelBallSpeed)
}

const framePerSecond = 50;

setInterval(game, 1000/framePerSecond)

// game()
// console.log(ball.VelocityX)
// console.log(ball.VelocityY)

