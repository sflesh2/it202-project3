let player = {
    "x" : 0, 
    "y": 0, 
    "health": 100, 
    "img" :  "./ship.png",
};


let playerImg = new Image(); 
let c = document.querySelector("#gameCanvas");
let ctx = c. getContext("2d");

let moveLeft = false; 
let moveRight = false; 
let moveUp = false; 
let moveDown = false; 


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
}

playerImg.onload = ()=>{
    player["x"] = c.width * .5; 
    player["y"] = c.height * .9      
}

//set up the images for the player and the harm object and kick off the animation 
function init(){
    playerImg.src = player["img"];
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
    console.log(e);
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

function draw(){
   clear();
   updateMove();
   ctx.drawImage(playerImg,player["x"],player["y"],playerImg.naturalWidth, playerImg.naturalHeight) 
   
   window.requestAnimationFrame(draw);
}

init();


