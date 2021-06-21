var hero,heroIMG;
var zombie,zombieIMG;
var swordzombie,swordzombieIMG;
var invisibleground;
var play=1;
var end=0;
var gameState=play;
var zombieGroup;
var restart,restartIMG;
var score=0;
var backgroundIMG;

function preload(){
  heroIMG=loadImage("hero.gif");
  zombieIMG=loadAnimation("zombie1.png","zombie2.png","zombie3.png","zombie4.png");
  swordzombieIMG=loadAnimation("swordzombie1.png","swordzombie2.png","swordzombie3.png","swordzombie4.png");
  restartIMG=loadImage("restart.png");
  backgroundIMG=loadImage("bacckground.jpg")
}
function setup() {
   createCanvas(1000,800);
   hero=createSprite(400, 600, 50, 50);
   hero.addImage(heroIMG);
   hero.scale=0.8
   invisibleground=createSprite(500,735,1000,20);
   invisibleground.visible=false;
   hero.debug = false;
   hero.setCollider("rectangle",+20,+20,140,200)
   zombieGroup=new Group();
  restart=createSprite(500,400);
  restart.addImage(restartIMG);
 score=0
}

function draw() {
  background(backgroundIMG);
  textSize(20)
  fill("red")
  text("Score: "+ score, 500,50);
  
  if(gameState === play){
  score = score + Math.round(getFrameRate()/60);
    if(keyDown("space")) {
      hero.velocityY = -12;
    }  
    hero.velocityY= hero.velocityY + 0.8;
    spawnzombies();
    if(zombieGroup.isTouching(hero)){
      gameState=end;  
    }
    restart.visible = false;
  }

  if(gameState == end){
    hero.velocityY = 0;
    zombieGroup.setVelocityXEach(0);
    zombieGroup.setLifetimeEach(0);
    hero.visible = false;
    restart.visible = true;
    if(mousePressedOver(restart)) {
      reset();
    }
  }
 
  hero.collide(invisibleground);
  drawSprites();


}
function spawnzombies() {
  if(frameCount % 400 === 0) {
  zombie=createSprite(1000,655);
  zombie.velocityX = -(6 + 3*score/100);
  zombie.debug = false;
  zombie.velocityX = -2;
     var rand = Math.round(random(1,2));
     console.log("rand val is "+rand);
     switch(rand) {
       case 1: zombie.addAnimation("zombie",zombieIMG);
               break;
       case 2: zombie.addAnimation("swordZombie",swordzombieIMG);
              break;
       default: break;
     }      
    zombie.lifetime = 600;
    zombieGroup.add(zombie)
  }
}
function reset(){
  gameState = play;
  score=0;
  hero.visible = true
  restart.visible = false;
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  zombieGroup.destroyEach();
}