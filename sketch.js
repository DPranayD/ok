//Create variables here
var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var feedDog;
var addFoods;
var fedTime;
var lastFed;
var foodObj;
var food;

function preload() {
  //load images here
  dogIMG = loadImage("images/dogImg.png");
  dogHappyIMG = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  foodStock = database.ref("food");
  foodStock.on("value", readStock);

  createCanvas(500, 500);
  dog = createSprite(250, 400, 20, 20);
  dog.addImage(dogIMG);
  dog.scale = 0.25;

  food = new Food();

  feed = createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}



function draw() {
  background(46, 139, 87);
  textSize(20);

  //add styles here
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill("white");
  text("Food Remaining : " + foodS, 20, 50);

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  } else if(lastFed==0){
    text("Last Feed : 12 AM",350,30)
  } else{
    text("Last Feed : "+ lastFed + " AM",350,30);
  }

  drawSprites();

  food.display();

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog(){
  dog.addImage(dogHappyIMG);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref("/").update({
    food: x
  });
}
