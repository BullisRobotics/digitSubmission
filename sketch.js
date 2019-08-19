//The purpouse of this is to simulate
//a drawing pad
//There are 64 "pixels" and the "ink" will be
//split between them depending on what percentage
//of the "pen" is covering them
//The goal is to create 64 digits between 0 and 100


//Stores our pixel objects
let digit_pix = [];
//Sets the dimensionality of our canvas, you will have to
//change penHardness and penWidth too
let SIDE_LENGTH_PIXELS = 28;

//used for size and orientation of elements
let smaller_dim = 100;
let smaller_dir = "x"

function setup() {
  createCanvas(windowWidth,windowHeight);

  //This allows us to size our elements
  //and orient our buttons
  if(windowWidth > windowHeight){
    smaller_dim = windowHeight
    smaller_dir = "y"
  }else{
    smaller_dim = windowWidth
    smaller_dir = "x"
  }

  //This creates the digit pixels
  for(let row = 0 ; row < SIDE_LENGTH_PIXELS ; row++){
    for(let col = 0 ; col < SIDE_LENGTH_PIXELS; col++){
      digit_pix.push( new Digit_Pixel(smaller_dim/SIDE_LENGTH_PIXELS*row,smaller_dim/SIDE_LENGTH_PIXELS*col,smaller_dim/SIDE_LENGTH_PIXELS) );
    }
  }

  //This creates the buttons
submit_button = createButton('Submit Digit');
submit_button.mousePressed(submit);
erase_button = createButton('Erase Ink');
erase_button.mousePressed(erase);

if(smaller_dir === "x" ){
  let extra_space = windowHeight-smaller_dim
  submit_button.position(0, smaller_dim);
  submit_button.size(smaller_dim/2,extra_space)
  erase_button.position(smaller_dim/2, smaller_dim);
  erase_button.size(smaller_dim/2,windowHeight-smaller_dim)
}else{
  let extra_space = windowWidth-smaller_dim
  submit_button.position(smaller_dim,0);
  submit_button.size(extra_space,smaller_dim/2)
  erase_button.position(smaller_dim,smaller_dim/2);
  erase_button.size(extra_space,smaller_dim/2)
}

}

function draw() {
  background(102, 204, 255)
  for (let pixel of digit_pix) {
  pixel.display();
}


}


function mouseDragged(){
  for (let pixel of digit_pix) {
  pixel.penCheck();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  if(windowWidth > windowHeight){
    smaller_dim = windowHeight
    smaller_dir = "y"
  }else{
    smaller_dim = windowWidth
    smaller_dir = "x"
  }

  for (let pixel of digit_pix) {
  pixel.resize(smaller_dim/SIDE_LENGTH_PIXELS);
  }

  if(smaller_dir === "x" ){
    let extra_space = windowHeight-smaller_dim
    submit_button.position(0, smaller_dim);
    submit_button.size(smaller_dim/2,extra_space)
    erase_button.position(smaller_dim/2, smaller_dim);
    erase_button.size(smaller_dim/2,windowHeight-smaller_dim)
  }else{
    let extra_space = windowWidth-smaller_dim
    submit_button.position(smaller_dim,0);
    submit_button.size(extra_space,smaller_dim/2)
    erase_button.position(smaller_dim,smaller_dim/2);
    erase_button.size(extra_space,smaller_dim/2)
  }
}

function submit() {
  console.log("Information submitted!");
  let values = [];
  for (let pixel of digit_pix) {
  values.push(pixel.ink);
  }
  console.log(values)
}

function erase() {
  console.log("Canvas Erased!");
  for (let pixel of digit_pix) {
    pixel.erase();
  }
}

class Digit_Pixel {
  constructor(x_val,y_val,size) {
    this.penHardness = 30;
    this.penWidth = 1.5; //This will divide the mouse distance
    this.x = x_val;
    this.y = y_val;
    this.side = size;
    this.ink = 255;
  }

  penCheck() {
    let mouse_distance = dist(mouseX,mouseY,this.x+this.side/2, this.y+this.side/2)/this.penWidth;
    if(mouse_distance <= this.side){
      let change = (this.side-mouse_distance) / this.side;
      this.ink = max(this.ink - change * this.penHardness,0);
    }
  }

  display() {
    noStroke();
    fill(this.ink);
    rect(this.x, this.y, this.side, this.side);
  }

  resize(newSize){
    let changeFactor = this.side / newSize;
    this.x = this.x / changeFactor;
    this.y = this.y / changeFactor;
    this.side = newSize;
  }

  erase(){
    this.ink = 255;
  }
}
