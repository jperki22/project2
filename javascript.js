<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<style>
canvas {
    border:7px solid #00aaff;
    background-color: #00aaff;
}
</style>
</head>

<body onload="startGame()">
<br>

<button onmousedown="accelerate(-0.2)"onmouseup="accelerate(0.05)"<p style="height:27px;width:815px">Click to Accelerate</button>
<div class="resetButton"></div>
<button <p style="height:27px;width:815px"<type="button"onclick="alert('Owner: Landon Sturtevant')">Credits</button>
<button <p style="height:27px;width:815px"<type="button"onclick="alert('Click OK to Continue')">Pause</button>
<button <p style="height:27px;width:815px"<type="button"onclick="alert('High Score is ' + highScore());">HighScore</button>
<script>
function highScore(score) {
   var saved = 0;
   try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
   if (!(typeof score === 'undefined')) {
      saved = score;
      localStorage.highScore = '' + score;
   }
   if (isNaN(saved)) {
      saved = 0;
      localStorage.highScore = '0';
   }
   return saved;
}
var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;
var gameSpeed = 1;

function startGame() {
    myBackground = new component(800, 380,"http://static.giantbomb.com/uploads/original/29/297846/2789895-cool+space+backgrounds+desktop+hd+wallpaper.jpg", 0, 0, "image");
    myGamePiece = new component(50, 50, "http://images.tourismholdings.com/public/2016/02/56bd3c714ecc6.png", 35, 200, "image");
    myScore = new component("30px", "Algerian", "turquoise", 15, 30, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 290;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
      this.type = type;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; 
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.x = x;
    this.y = y;   
    this.update = function() {
        ctx = myGameArea.context;
    if (type == "image") {
      ctx.drawImage(this.image, 
        this.x, 
        this.y,
        this.width, this.height);
    }
    else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }  
     this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;	
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop()
            document.getElementsByClassName("resetButton")[0].innerHTML='<button onclick="location.reload();"<p style="height:27px;width:815px">Restart Game</button>';
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 150;
        maxGap = 250;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(15, height, "https://orig00.deviantart.net/bb11/f/2014/127/f/e/hexagon_wallpaper___version_3_by_designedby_jack-d7hh9xo.png", x, 0, "image"));
        myObstacles.push(new component(15, height, "https://orig00.deviantart.net/bb11/f/2014/127/f/e/hexagon_wallpaper___version_3_by_designedby_jack-d7hh9xo.png", x, height + gap, "image"));
        gameSpeed = gameSpeed - 1;    
    }
    myBackground.newPos();   
    myBackground.update();
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += gameSpeed;
        myObstacles[i].update();
    }
    myScore.text="Space Run                                                         SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos();   
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.speedY = -1;
}

function movedown() {
    myGamePiece.speedY = 1;
}

function moveleft() {
    myGamePiece.speedX = -1;
}

function moveright() {
    myGamePiece.speedX = 1;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}
function accelerate(n) {
    myGamePiece.gravity = n;
}
</script>
</body>
</html>
<audio <embed loop="true" autoplay="autoplay">
     <source src="http://a.tumblr.com/tumblr_m545gt2gbp1r5da8vo1.mp3" />     
 </audio>

<script>
</script>
</body>
</html>