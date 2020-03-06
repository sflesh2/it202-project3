let player = {
    "x" : 0, 
    "y": 0, 
    "health": 100, 
    "score": 0,
    "img" :  "./ship.png",
    "inv" : false, //used for invincibility frames
    "lives": 3
};

let meteors = [];
let benefit = [];

let mImg = ["./Meteor1.png", "./Meteor2.png", "./Meteor3.png"];

let playerImg = new Image(); 
let c = document.querySelector("#gameCanvas");
let ctx = c. getContext("2d");

let moveLeft = false; 
let moveRight = false; 
let moveUp = false; 
let moveDown = false; 

//will create a new meteor object
function newMeteor(){
    let meteor = new Object(); 
    meteor.y = 0;
    meteor.x = Math.floor(Math.random() * c.width);; 
    meteor.state = 0;
    meteor.img = new Image();
    return meteor;
}


function updateMove(){
    if(moveLeft){
        player["x"] -= 1; 
    }else if(moveRight){
        player["x"] += 1; 
    }
    
    if(moveUp){
        player["y"] -= 1; 
    }else if(moveDown){
        player["y"] += 1; 
    }
    
    if(meteors.length > 0 && meteors[0].y > c.height){
        player["score"] += 5; //gain points for each meteor passed
        meteors.shift();
    }
    
    for(let m of meteors){
        m["y"] += 1;
    }
}


//set up the images for the player and the harm object and kick off the animation 
function init(){
    playerImg.src = player["img"];
    player["x"] = c.width * .5; 
    player["y"] = c.height * .5;    
    meteors.push(newMeteor());   //todo remove this. this is a test
    
    window.requestAnimationFrame(draw);
}

function clear(){
   ctx.clearRect(0,0,c.width, c.height);
}
 
//when a key is released, the player stops moving
document.addEventListener("keyup", e=>{
    if(e.key == "a"){
        moveLeft = false; 
    }else if(e.key == "d"){
        moveRight = false;
    }else if(e.key == "w"){
        moveUp = false; 
    }else if(e.key == "s"){
        moveDown = false;
    }
});

//starts moving the player
document.addEventListener("keydown", e=>{
    if(e.key == "a"){
        moveLeft = true; 
    }else if(e.key == "d"){
        moveRight = true; 
    }else if(e.key == "w"){
        moveUp = true;
    }else if(e.key == "s"){
        moveDown = true;
    }
    
    
});

let timer = 0; 
function drawMeteors(){
    for(let m of meteors){
        m.img.src = mImg[m.state];
        
        timer += 1;
        if(timer % 5 == 0){
            m.state+= 1;
            if(m.state > 2){
                m.state = 0;
            }
            timer = 0;
        }
       
        ctx.drawImage(m.img, m["x"], m["y"]);
    }
}

function isHit(){
    let playerRadius = playerImg.width * .25; 
    let metRadius = meteors[0].img.width*.5;
    
    //get the center of the sprite
    let playerX = player.x + playerImg.width/2;
    let playerY = player.y + playerImg.height/2; 
    
    //check if there is a meteor that is hitting the ship
    for(let m of meteors){
        let metX = m.x + m.img.width/2; 
        let metY = m.y + m.img.height/2; 
        
        let dist = Math.sqrt(Math.pow((metX - playerX), 2) + Math.pow((metY - playerY), 2));
        if(dist < (playerRadius + metRadius)){
            player["lives"] -= 1; 
            return true; 
        }
    }
    return false;
    
}

let mTimer = 0; 
function generateMeteors(){
    mTimer += 1; 
    if(mTimer % 40 == 0){
      if(meteors.length < 50){
        meteors.push(newMeteor());
      } 
      mTimer = 0;
    }
    
}

let invTimer = 0; 

function draw(){
   clear();
   updateMove();
   generateMeteors();
   
    //this checks if a player is hit.
    //if they are hit it gives them a flashing animation 
   if(player["inv"] == false){
       player["inv"] = isHit(); 
       if(player["inv"] == true){
           playerImg.src = "./clearShip.png";
           invTimer = 200; 
       }
   }else{
       invTimer -= 1; 
       if(invTimer == 0){
           player["inv"] = false; 
           playerImg.src = "./ship.png"
       }
   }
   
    
   if(player["y"] <= 0){
       player["y"] = 0;
       moveUp = false;
   }
    
   if(player["x"] <= 0){
       player["x"] = 0;
       moveLeft = false;
   }
    
   if(player["y"] + playerImg.height >= c.height){
       player["y"] = c.height - playerImg.height;
       moveDown = false;
   }
    
   if(player["x"] + playerImg.width >= c.width){
       player["x"] = c.width - playerImg.width;
       moveRight = false;
   }
    
   //an attempt to stop the image from stretching. not very successful
   if(playerImg.width>playerImg.height){
        c.width = 300;
        c.height = 300 / playerImg.width * playerImg.height;
   } else {
        c.width = 300 / playerImg.height * playerImg.width;
        c.height = 300;
   } 

   drawMeteors();
   ctx.drawImage(playerImg,player["x"],player["y"]);
   
   let msg = "Score: " + player["score"];
   ctx.fillText(msg, 10, 10);
   
   
   let liveMsg = "Lives: " + player["lives"];
   ctx.fillText(liveMsg, 10, 20);
   
   window.requestAnimationFrame(draw);
}

init();


