
//var variablep5js = 10.0;
//let variablefromHTML = document.getElementById('resultado');
let  v_fromHTML;
var button;
var jorge_slider1;

function setup() {
  createCanvas(400, 400);
  button = createButton("Hello");
  jorge_slider1 = createSlider(0, 255, 125);
  
  
}

function draw() {
  background(220);
  rectMode(CENTER);
  
  let variablefromHTML = document.getElementById('resultado');
  let v_fromHTML= variablefromHTML.value;
  


  let xLabel = document.getElementById('x-label');
  xLabel.innerText = 'X: ' + v_fromHTML + '  X: ' + mouseX ;

  col = jorge_slider1.value();
  fill(col,0,0);
  rect(width/2, height/2 , 200, 200);
}


    var jorge_slider1 = document.getElementById("jorge_slider1");
       
       function changeText(text){
      document.getElementById("jorge_slider1").innerHTML = text;
      }
       