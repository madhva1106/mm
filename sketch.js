var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_stop
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var background1
var gameOver,restart

score=0

function preload(){
  
  monkey_running =            loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  backgroundImage =loadImage("jungle.jpg")
}
function setup() {
  createCanvas(1200,600);
  background1=createSprite(200,200,600,600)
  background1.scale=1.5
  background1.addImage(backgroundImage)
  monkey=createSprite(50,400)
  monkey.addAnimation("monkey", monkey_running)
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.2
  ground=createSprite(300,400,600,20)
  ground.visible=false
  
  monkey.setCollider("circle",120,0,300);
// monkey.debug = true;
   
   
  FoodGroup = new Group();
  obstacleGroup = new Group();
}

 function draw() {
   background("white")
  camera.position.x = monkey.x;
  camera.position.y = monkey.y;
  if(gameState ===PLAY){
    if (background1.x < 180){
      background1.x = background1.width/2;
      }
     if(keyDown("space") && monkey.y > 200){
    monkey.velocityY = -12;
      }
    
     monkey.velocityY = monkey.velocityY + 0.4;
  
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score = score + 2
    } 
    
    if(obstacleGroup.isTouching(monkey)){
      
       var size = Math.round(random(10,40))
  switch(size){
    case 10: monkey.scale = 0.10;
      break;
    case 20: monkey.scale = 0.12;
      break;
    case 30: monkey.scale = 0.14;
      break;
    case 40: monkey.scale = 0.16;
      break;
  }
  }
  }
spawnObstacle();
spawnFood();
monkey.collide(ground)
drawSprites();
fill("red")
textSize(20);
text("SCORE: "+ score,200,50);
  
 }

function spawnObstacle(){
  if(frameCount%60 === 0){
    stone = createSprite(700,370,10,10);
    stone.velocityX = -(7 + score/2);
    stone.addImage(obstacleImage);
    stone.scale = 0.25;
    
    obstacleGroup.add(stone);


  }
}

function spawnFood(){
  if(frameCount%80 === 0){
    banana = createSprite(650,100,40,10);
    banana.velocityX = -6;
    banana.y = random(100,250);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    FoodGroup.add(banana);
  }
  } 