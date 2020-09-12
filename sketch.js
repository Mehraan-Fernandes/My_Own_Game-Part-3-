var astronaut, astronautImg;
var asteroids = []
var asteroid, asteroidImg;
var ufo, ufoImg
var ufos = [];
var bg;
var right, left, rKey, lKey
var space;
var score = 0;
var gameState = "play"
var retryImg,retry;
var sound;

function preload() {
  sound = loadSound("space.mp3")
  ufoImg = loadImage("ufo.png");
  retryImg = loadImage("retry.png");
  right = loadImage("right.png");
  left = loadImage("left.png")
  asteroidImg = loadImage("astroid1.png")
  bg = loadImage("background.png");
/*  astronautImg = loadAnimation(
    "gifCollection/frame_000.gif", "gifCollection/frame_001.gif",
    "gifCollection/frame_002.gif", "gifCollection/frame_003.gif",
    "gifCollection/frame_004.gif", "gifCollection/frame_005.gif",
    "gifCollection/frame_006.gif", "gifCollection/frame_007.gif",
    "gifCollection/frame_008.gif", "gifCollection/frame_009.gif",
    "gifCollection/frame_010.gif", "gifCollection/frame_011.gif",
    "gifCollection/frame_012.gif", "gifCollection/frame_013.gif",
    "gifCollection/frame_014.gif", "gifCollection/frame_015.gif",
    "gifCollection/frame_016.gif", "gifCollection/frame_017.gif",
    "gifCollection/frame_018.gif", "gifCollection/frame_019.gif",
    "gifCollection/frame_020.gif", "gifCollection/frame_021.gif",
    "gifCollection/frame_022.gif", "gifCollection/frame_023.gif",
    "gifCollection/frame_024.gif", "gifCollection/frame_025.gif",
    "gifCollection/frame_026.gif", "gifCollection/frame_027.gif",
    "gifCollection/frame_028.gif", "gifCollection/frame_029.gif",
    "gifCollection/frame_030.gif", "gifCollection/frame_031.gif",
    "gifCollection/frame_032.gif", "gifCollection/frame_033.gif",
    "gifCollection/frame_034.gif", "gifCollection/frame_035.gif",
    "gifCollection/frame_036.gif", "gifCollection/frame_037.gif",
    "gifCollection/frame_038.gif", "gifCollection/frame_039.gif",
    "gifCollection/frame_040.gif", "gifCollection/frame_041.gif",
    "gifCollection/frame_042.gif", "gifCollection/frame_043.gif",
    "gifCollection/frame_044.gif", "gifCollection/frame_045.gif",
    "gifCollection/frame_046.gif", "gifCollection/frame_047.gif",
    "gifCollection/frame_048.gif", "gifCollection/frame_049.gif",
    "gifCollection/frame_050.gif", "gifCollection/frame_051.gif",
    "gifCollection/frame_052.gif", "gifCollection/frame_053.gif",
    "gifCollection/frame_054.gif", "gifCollection/frame_055.gif",
    "gifCollection/frame_056.gif", "gifCollection/frame_057.gif",
    "gifCollection/frame_058.gif", "gifCollection/frame_059.gif",
    "gifCollection/frame_060.gif", "gifCollection/frame_061.gif",
    "gifCollection/frame_062.gif", "gifCollection/frame_063.gif",
    "gifCollection/frame_064.gif", "gifCollection/frame_065.gif",
    "gifCollection/frame_066.gif", "gifCollection/frame_067.gif",
    "gifCollection/frame_068.gif", "gifCollection/frame_069.gif",
    "gifCollection/frame_070.gif", "gifCollection/frame_071.gif",
    "gifCollection/frame_072.gif", "gifCollection/frame_073.gif",
    "gifCollection/frame_074.gif", "gifCollection/frame_075.gif",
    "gifCollection/frame_076.gif", "gifCollection/frame_077.gif",
    "gifCollection/frame_078.gif", "gifCollection/frame_079.gif",
    "gifCollection/frame_080.gif", "gifCollection/frame_081.gif",
    "gifCollection/frame_082.gif", "gifCollection/frame_083.gif",
    "gifCollection/frame_084.gif", "gifCollection/frame_085.gif",
    "gifCollection/frame_086.gif", "gifCollection/frame_087.gif",
    "gifCollection/frame_088.gif"
  )*/

}


function setup() {
  createCanvas(innerWidth, innerHeight);
  space = createSprite(innerWidth / 2, innerHeight - 8000)
  space.addAnimation("animation", bg);

  space.scale = 3.9
  space.velocityY = 3;
  
  

  rKey = createSprite(innerWidth - 50, innerHeight - 50, 20, 20);
  rKey.addImage(right);
  rKey.scale = 0.3

  lKey = createSprite(innerWidth - 110, innerHeight - 50, 20, 20);
  lKey.addImage(left);
  lKey.scale = 0.22

  astronaut = createSprite(innerWidth / 2, innerHeight - 175, 50, 50);
 // astronaut.addAnimation("animation", astronautImg);
  astronaut.setCollider("rectangle", 0, -90, 150, 190);
  astronaut.scale = 0.7

  sound.loop();

  retry = createSprite(innerWidth/2,innerHeight/2);
  retry.addImage(retryImg);
  retry.scale= 1.5;
  retry.visible = false
}

function draw() {
  frameRate(60)
  background(255)
 


  if(gameState === "play") {
  
  
 // space.velocityY = space.velocityY + score/3500;
  score++
  //score = score/3

  if(space.y > 5000){
    space.y = 0
  }

  astronaut.debug = true
  if (keyDown(LEFT_ARROW)) {
    astronaut.x += -10
  }

  if (mousePressedOver(rKey)) {
    astronaut.x += 10
  }

  if (mousePressedOver(lKey)) {
    astronaut.x += -10
  }

  if (keyDown(RIGHT_ARROW)) {
    astronaut.x += 10
  }


  if (frameCount % 150 === 0) {
    makeAsteroids();
  }

  if (frameCount % 300 === 0 && score/5 > 300) {
    makeUfo();
  }



  for (var i = 0; i < asteroids.length; i++) {
    if (astronaut.isTouching(asteroids[i])) {
      astronaut.destroy();
      gameState = "end" 
    }
     if (asteroids[i].y === height + 20) {
      asteroids[i].destroy();
    }
    }

    for (var i = 0; i < ufos.length; i++) {
      if (astronaut.isTouching(ufos[i])) {
        astronaut.destroy();
        gameState = "end" 
      }
    
      if (ufos[i].y === height + 50) {
        ufos[i].destroy();
      }
    
    }

   

  
  
}else if(gameState != "play"){
  for (var i = 0; i < asteroids.length; i++) {
  asteroids[i].velocityY = 0;
  asteroids[i].velocityX = 0;
  }
  for (var i = 0; i < ufos.length; i++) {
    ufos[i].velocityY = 0;
    ufos[i].velocityX = 0;
  }
  space.velocityY = 0;
  sound.stop();

  retry.visible = true;
  retry.debug = true;

  if(mousePressedOver(retry)){
   reset();
    // retry.destroy();
  }
  }

drawSprites();
textSize(25)
text("Score: " + Math.round(score/5), innerWidth-200,innerHeight/2-100);
}

function makeAsteroids() {
  asteroid = createSprite(random(10, innerWidth - 10), 0, 25, 25)
  asteroid.setVelocity(random(-2, 2), 2);
  asteroid.velocityY = asteroid.velocityY + score/100;
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.7
  asteroids.push(asteroid);
}


function makeUfo() {
  ufo = createSprite(random(10, innerWidth - 10), 0, 25, 25);
  ufo.setVelocity(random(-5, 5), 5);
  ufo.addImage(ufoImg);
  ufo.scale = 0.3
  ufos.push(ufo);
}

function reset() {
  score = 0;
  gameState = "play";
  sound.loop();
  for (var i = 0; i < asteroids.length; i++) {
    asteroids[i].velocityY = 2;
    asteroids[i].velocityX = random(-2,2);
    }

    for (var i = 0; i < ufos.length; i++) {
      ufos[i].velocityY = 5;
      ufos[i].velocityX = random(-5,5);
      }
  space.velocityY = 0.8;
  retry.destroy();
}