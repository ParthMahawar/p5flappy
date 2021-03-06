function Bird() {
	this.y = 360;
	this.x = 80;
	this.gravity = 0.3;
	this.velocity = 0;

	this.show = function() {
		fill(196, 21, 8);
		ellipse(this.x, this.y, 30, 30);
	}

	this.update = function() {
		if(this.velocity > -14){
			this.velocity -= this.gravity;
		}
		this.y -= this.velocity;

		if(this.y >= height){
			this.y = height;
			this.velocity = 0;
			ded = true;
		}

		if(this.y <= 0){
			this.y = 0;
			this.velocity = 0;
		}
	}

	this.jump = function() {
		if(this.velocity<0) this.velocity = 9;
		else this.velocity += 6;
	}
}

function Pipe(){
	this.top = random(height-200);
	this.bottom = height - this.top - 200;
	this.x = width;

	this.show = function(){
		fill(13, 255, 77);
		rect(this.x, 0, 20, this.top);
		rect(this.x, height-this.bottom, 20, this.bottom)
	}

	this.update = function(){
		this.x -= 5;
	}

	this.hits = function(bird){
		if(bird.y<this.top||bird.y> height-this.bottom){
			if(this.x < bird.x && bird.x < this.x + 20){
				return true
			}
		}
		return false
	}
}

var bird;
var pipes = [];
var ded = false;
var score = -5;

function setup() {
	createCanvas(1280, 720);
	background(3, 255, 251);
	bird = new Bird();
	pipes.push(new Pipe());
}

function draw() {
	background(3, 255, 251);
	textSize(32);
	text(score, 640, 50);
	for(var i = pipes.length-1; i>0; i--){
		pipes[i].show();
		if(!ded) pipes[i].update();

		if(pipes[i].hits(bird)) ded = true;

		if (pipes[i].x<0) pipes.splice(i, 1);
	}
	if(!ded) bird.update();
	bird.show();

	if(frameCount%60==0){
		pipes.push(new Pipe());
		if(!ded) score += 1;
	}
	textSize(32);
	text(score, 640, 50);
}

function mouseClicked(){
	bird.jump();
}

function keyPressed(){
	mouseClicked();
}