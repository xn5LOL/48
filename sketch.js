var player,playerImg,playerC
var jf,jfImg
var hf,hfImg
var back,backImg
var play,playImg,pause,pauseImg
var winSound
var up 
var down
var PLAY = 1
var END = 0
var gameState = PLAY
var score  = 0

function preload(){
	backImg = loadImage("jungle.jpg")
	playerImg = loadAnimation("a.png","b.png","c.png")
	playerC = loadAnimation("player_collided.png")
	jfImg = loadImage("jf-removebg-preview.png")
	hfImg = loadImage("hf-removebg-preview.png")
	playImg = loadImage("play.png")
	
}

function setup(){
	createCanvas(windowWidth,windowHeight)

	jfGroup = new Group();
	hfGroup = new Group();

	back = createSprite(0,0,windowWidth,windowHeight)
	back.scale = 3
	back.addImage(backImg)
	back.velocityX = -2

	player = createSprite(windowWidth-150,windowHeight-350,50,100)
	player.scale = 1.5
	player.addAnimation("img",playerImg)
	player.addAnimation("change",playerC)

	jf = createSprite(windowWidth-850,windowHeight-450,35,35)
	jf.velocityY = 5
	jf.visible = false

	hf = createSprite(windowWidth-850,windowHeight-300,35,35)
	hf.velocityY = 5
	hf.visible = false
	
	play = createSprite(windowWidth-780,windowHeight-600,10,10)
	play.scale = 0.4
	play.addImage(playImg)

	up = createSprite(windowWidth-750,windowHeight-0,2000,10)
	up.visible = false
	
	down = createSprite(windowWidth-750,windowHeight-850,2000,10)
	down.visible = false
}

function draw(){
	
	background("#013C28")
	
	if(gameState === PLAY){
		play.visible = false
		
	if(frameCount%85 === 0){
		jf = createSprite(windowWidth-437,20,35,35)
		jf.x = random(50,windowWidth)
		jf.scale = 0.4
		jf.velocityY = 4
		jf.addImage(jfImg)
		jfGroup.add(jf)
		
	}

	if(frameCount%85  === 0){
		hf = createSprite(windowWidth-478,20,35,35)
		hf.x = random(50,windowWidth)
		hf.scale = 0.5
		hf.velocityY = 3
		hf.addImage(hfImg)
		hfGroup.add(hf)
	}

	for (var i = 0; i < hfGroup.length; i++) {
		if (hfGroup.get(i).isTouching(player)) {
			score = score + 10
			hfGroup.get(i).destroy();
		}
	}
	
	if(player.x > 1250 ){
		player.x = 150
	}

	if(player.x < 0){
		player.x = 150
	}

	if(back.x < 0 ){
		back.x = back.width/2
	}

	if(keyDown("RIGHT_ARROW")){
		player.velocityX = +5
	}

	if(keyDown("LEFT_ARROW")){
		player.velocityX = -5
	}

	if(keyDown("DOWN_ARROW")){
		player.velocityX = 0
	}

	if(player.isTouching(jfGroup)){
		player.velocityX = 0
		jfGroup.setVelocityYEach(0)
		hfGroup.setVelocityYEach(0)
		gameState = END
	}
 
	if(player.isTouching(up)){
		player.velocityX = 0
		jfGroup.setVelocityYEach(0)
		hfGroup.setVelocityYEach(0)
		gameState = END
	}
 
	if(player.isTouching(down)){
		player.velocityX = 0
		jfGroup.setVelocityYEach(0)
		hfGroup.setVelocityYEach(0)
		gameState = END
 }

}
	else if(gameState === END){
		back.velocityX = 0
		play.visible = true
		player.changeAnimation("change",playerC)
		jfGroup.setVelocityYEach(0)
		hfGroup.setVelocityYEach(0)
	}
	if(mousePressedOver(play)){
		reset();
	}
	
	drawSprites();

	textSize(35)
	fill(255)
	text("Score :"+ score,110,150)
	
    if(gameState === END){
	textSize(75)
	fill(255)
	text("GAME OVER",500,350)
    }	
	
	}

	function reset(){
		gameState = PLAY
		player.x = 150
		player.changeAnimation("img",playerImg)
		back.velocityX = -2
		jfGroup.setVelocityYEach(1)
		hfGroup.setVelocityYEach(2)
		back.x = windowWidth-750
		score = 0
	}
