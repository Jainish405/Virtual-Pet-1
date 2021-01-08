//Create variables here
var dog,happydog,foodS,foodStock

function preload()
{
  dogImg=loadImage("images/Dog.png");
  happydogImg=loadImage("images/happydog.png");
}

function setup() {

  database=firebase.database();
  createCanvas(500,500);
  
  dog=createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(20); 
  
}


function draw() { 
  background(46,139,87); 

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImg);
  }

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,155,170);
  textSize(13);
  text("Note:Press Up Arrow Key To Feed Drago Milk!",120,10,300,20);

  drawSprites();
  

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  })
}



