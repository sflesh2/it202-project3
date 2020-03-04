let player = {
    "x" : 0, 
    "y": 0, 
    "health": 100, 
    "img" :  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSZ7axdY00zeyQvGMRDBbMcIPwuVR_rT0R_wnjMnliXryAFLUsf",
};
function clear(c, ctx){
   ctx.clearRect(0,0,c.width, c.height);
}

var playerImg = new Image(); 
var c = document.querySelector("#gameCanvas"); 
var ctx = c.getContext("2d");
var img = new Image()
img.onload = ()=>{
    player["x"] = c.width * .5; 
    player["y"] = c.height * .9
       
}
img.src = player["img"];  

function draw(){
   clearImage(c, ctx);
   ctx.drawImage(img,player["x"],player["y"],img.naturalWidth*.25, img.naturalHeight*.25) 
    
   window.requestAnimationFrame(draw);
}

window.onload = function(){
    window.requestAnimationFrame(draw);
    
}

