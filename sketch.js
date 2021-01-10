var dog, happyDog;
var database;
var foodS, foodStock;
var dogImg;
var feedPetButton,addFoodButton;
var fedTime,lastFed;
var foodObj;
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  foodObj = new Food();
  database = firebase.database();

  createCanvas(500, 500);

  var dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  feedPetButton = createButton("Feed the dog");
  feedPetButton.position(700,95);
  feedPetButton.mousePressed(feedDog);

  addFoodButton = createButton("Add Food");
  addFoodButton.position(800,95);
  addFoodButton.mousePressed(addFood);




}


function draw() {  
background(46,139,87);
foodObj.display();

fedTime = database.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}

  drawSprites();
  fill("lime");
  stroke("black");
  text("food remaning :"+foodS,170,200);
  textSize(15);
  
}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  dog.addImage(dogImg2)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  db.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addFood(){
  foodS++
  db.ref('/').update({
    Food:foodS
  })
}



