const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render ;

var boxArray = [];
var y1 = 195 ;
var y2 = 345 ;
var length = 35 ;
var score = 0 ;
var gameState = "play";

function preload(){
  bgImg = loadImage("images/gamingbackground1.jpg");
  heroImg = loadImage("images/superhero1.png");
  monsterImg = loadImage("images/monster1.png");
  monster2Img = loadImage("images/monster2.png");
}

function setup() {
  createCanvas(900, 450);
  engine = Engine.create();
  world = engine.world;

  bg = createSprite(550,height/2);
  bg.addImage("bg",bgImg);
  bg.scale = 0.6
  bg.velocityX = -2 ;

  base1 = new Ground(425,380,270,10);

  base2 = new Ground(700,220,200,10);

  shield = createSprite(715,330,200,200);
  shield.shapeColor = "red";  

  hero = createSprite(100,100,200,50);
  hero.setCollider("rectangle",-80,-80);
  hero.addImage("hero",heroImg);
  hero.scale = 0.1 ;

  herobody = new Hero(100,100,200,50);

  monster = createSprite(720,330,80,80);
  monster.addImage("monster",monsterImg);
  monster.addImage("died",monster2Img);
  monster.scale = 0.08 ;

  monsterbody = new BakeMono(720,330,80,80);

  for(var i = 0 ; i < 5 ; i++){
    boxArray.push(new Box(700,y1,length,length));
    y1 = y1 - length
  }
  y1 = 195
  for(var j = 0 ; j < 4 ; j++){
    boxArray.push(new Box(700 + length,y1,length,length));
    y1 = y1 - length ;
  }
  y1 = 195
  for(var k = 0 ; k < 4 ; k++){
    boxArray.push(new Box(700 - length,y1,length,length));
    y1 = y1 - length ;
  }
  y1 = 195
  for(var a = 0 ; a < 6 ; a++){
    boxArray.push(new Box(425,y2,length,length));
    y2 = y2 - length ;
  }
  y2 = 345 ;
  for(var b = 0 ; b < 5 ; b++){
    boxArray.push(new Box(425-length,y2,length,length));
    y2 = y2 - length ;
  }
  y2 = 345 ;
  for(var c = 0 ; c < 5 ; c++){
    boxArray.push(new Box(425+length,y2,length,length));
    y2 = y2 - length ;
  }
  y2 = 345 ;
  for(var d = 0 ; d < 4 ; d++){
    boxArray.push(new Box(425-2*length,y2,length,length));
    y2 = y2 - length ;
  }
  y2 = 345 ;
  for(var e = 0 ; e < 4 ; e++){
    boxArray.push(new Box(425+2*length,y2,length,length));
    y2 = y2 - length ;
  }
  y2 = 340 ;
}

function draw() {
  background("turquoise");
  drawSprites();

  Engine.update(engine);
  movementRestrict();
  
  if(bg.x < 350){
    bg.x = 550
  }

  if(gameState === "play"){
    for(var i = 0 ; i < 5 ; i++){
      boxArray[i].display();
    }
    for(var j = 0 ; j < 4 ; j++){
      boxArray[i+j].display();
    }
    for(var k = 0 ; k < 4 ; k++){
      boxArray[i+j+k].display();
    }
    for(var a = 0 ; a < 6 ; a++){
      boxArray[i+j+k+a].display();
    }
    for(var b = 0 ; b < 5 ; b++){
      boxArray[i+j+k+a+b].display();
    }
    for(var c = 0 ; c < 5 ; c++){
      boxArray[i+j+k+a+b+c].display();
    }
    for(var d = 0 ; d < 4 ; d++){
      boxArray[i+j+k+a+b+c+d].display();
    }
    for(var e = 0 ; e < 4 ; e++){
      boxArray[i+j+k+a+b+c+d+e].display();
    }
    
    fill("turquoise");
    textSize(25);
    text("Score : " + score,50,50);

    if(score > 200){
      shield.destroy();
      monster.changeImage("died");
    }
    if(hero.isTouching(shield)){
      console.log("GAME OVER !!");
      gameState = "lost";
    }
    if(hero.isTouching(monster) && gameState != "lost"){
      console.log("YOU WIN !!");
      gameState = "win";
    }
  }
  if(gameState === "lost"){
    fill("turquoise");
    textSize(40);
    textFont("Orbitron");
    text("Score : " + score,360,height/2);
    textSize(50);
    fill("red");
    stroke("black");
    strokeWeight(4);
    text("YOU LOSE !!",310,100);  
    bg.velocityX = 0 ;
  } 
  if(gameState === "win"){
    fill("turquoise");
    textSize(40);
    textFont("Orbitron");
    text("Score : " + score,360,height/2);
    textSize(50);
    text("YOU WIN !!",350,100);
    bg.velocityX = 0 ;
    monster.velocityX = 2 ;
    monster.rotationSpeed = 5 ;
  }
}
function mouseDragged(){
  if(gameState === "play"){
    hero.x = mouseX ;
    hero.y = mouseY ;
  }

}
function movementRestrict(){
  Matter.Body.setPosition(herobody.body,{x:hero.x,y:hero.y});
  Matter.Body.setAngularVelocity(herobody.body,0);
  Matter.Body.setPosition(monsterbody.body,{x:monster.x,y:monster.y});
  Matter.Body.setAngularVelocity(monsterbody.body,0);
}