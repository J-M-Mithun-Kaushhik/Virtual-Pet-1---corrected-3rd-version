//Create variables here
var dog, foodCount;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  dogHappyImg = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(400,400);
  dog.scale = 0.5;
  dog.addImage("normal", dogImg);
  dog.addImage("happy", dogHappyImg);

  db = firebase.database();
  db.ref("Pet_food").on("value", function (data){
    foodCount = data.val();
  })
}


function draw() {
  background(180);
  drawSprites();
  console.log(foodCount);
  if (foodCount){
  text("Food Count: " + foodCount, 300,50);

    if(foodCount >= 0){

  if (keyWentDown(UP_ARROW)){
    //console.log("hello");
    foodCount = foodCount - 1;
    updateFoodCount();
    dog.changeImage("happy");

    if (foodCount === 0)
      dog.changeImage("normal");
  }
  }
}

  //add styles here
}

function updateFoodCount(){
  db.ref("/").update({
    Pet_food: foodCount
  })
}