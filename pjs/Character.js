function Character(){

	var settings = settings;

	this.set = function(settings){
		this.setCanvas(settings.canvas);
		this.setCanvasMask(settings.mask);
		this.setPosX(settings.posX);
		this.setPosY(settings.posY);
		this.setSprites(settings.sprites);
		this.setDirection(settings.direction);
		this.setInitialState(); /* IMPORTANT */
	}

	// SPRITES

	/*
	 * Default animations
	 * idle -> "breathing"
	 * moving -> "walking"
	*/

	this.sprites = {
		idle : [],
		moving :[],
		pateando :[],

	};

	// ATTRIBUTES

	this.width = null;
	this.height = null;
	this.velocity = 5;
	this.direction = null;

	// STATE - idle, moving, pateando, saltando

	this.state = {
		name : null,
		frame : null,
		sprites : null,
		action : {
			step : 0,
			steps : 10
		}
	}

	// INITIAL STATE

	this.setInitialState = function(){
		this.state.name = "idle";
		this.state.frame = 0;
		this.state.sprites = this.sprites.idle;
		
		/*
		* A shortcut for this.state.sprites[this.state.frame] is this.getActualFrame();
		*/

		this.width = this.state.sprites[this.state.frame].width;
		this.height = this.state.sprites[this.state.frame].width;
	}

	// INITIAL STATE

	this.setState = function(action){
		if(this.state.name != action){
			this.state.name = action;
			// Number of frame
			this.state.frame = 0;

			switch(action){
				case "idle" :
					this.state.sprites = this.sprites.idle;
					// Index of frame
					this.state.action.step = 0;
					// Number of sprites
					this.state.action.steps = this.state.sprites.length;
					break;
				case "moving" :
					this.state.sprites = this.sprites.moving;
					// Index of frame
					this.state.action.step = 0;
					// Number of sprites
					this.state.action.steps = this.state.sprites.length;
					break;
				case "pateando" :
					this.state.sprites = this.sprites.pateando;
					// Index of frame
					this.state.action.step = 0;
					// Number of sprites
					this.state.action.steps = this.state.sprites.length;
					break;
			}
			
			this.width = this.state.sprites[this.state.frame].width;
			this.height = this.state.sprites[this.state.frame].width;
		}
	}

	this.getState = function(){
		return this.state.name;
	}

	this.collided = false;

	// CANVAS

	this.canvas = null;
	this.ctx = null;

	// POSITION

	this.posX = null;
	this.posY = null;

	// MASK

	this.mcanvas = null;
	this.mctx = null;
	this.pixels = null;

	

	/***
	* METHODS
		this.getActualFrame
		this.drawSprite
		this.setCanvasMask 
		this.drawMask
		this.setPixels
		this.getMaskPixels 
		this.getPixels 
		this.detectCollision
		this.moveRight
		this.moveLeft 
		this.moveUp
		this.moveUp
		this.jump 
		this.reviewState 
		this.getCanvas
		this.setWidth
		this.getWidth
		this.setHeight
		this.getHeight
		this.setImages
		this.getImages
		this.getImage
		this.setFrames
		this.getFrames
		this.setPosX
		this.getPosX
		this.setPosY
		this.getPosY
		this.setCanvas
	***/

	this.animating = false;

	this.setWidth = function(width){
		this.width = width;
	}
	
	this.getWidth = function(){
		return this.width;
	}
	
	this.setHeight = function(height){
		this.height = height;
	}
	
	this.getHeight = function(){
		return this.height;
	}
	
	this.setSprites = function(sprites){
		this.sprites.idle = sprites.liukan.idle;
		this.sprites.moving = sprites.liukan.moving;
		this.sprites.pateando = sprites.liukan.pateando;
	}
	
	/*
	* Return all the sprites of the actual state.
	*/

	this.getSprites = function(){
		return this.state.sprites;
	}
	
	/*
	* Return the actual sprite of the actual state.
	*/

	this.getSprite = function(i){
		return this.state.sprites[this.state.frame];
	}
	
	/*
	* NOT USED 
	*/
	this.setFrames = function(frames){
		this.frames = frames;
	}
	
	/*
	* NOT USED 
	*/
	this.getFrames = function(frames){
		return this.frames;
	}
	
	this.setPosX = function(posx){
		this.posX = posx;
	}
	
	this.getPosX = function(){
		return this.posX;
	}
	
	this.setPosY = function(posy){
		this.posY = posy;
	}
	
	this.getPosY = function(){
		return this.posY;
	}
	
	this.setCanvas = function(canvas){
		this.canvas = canvas;
		this.ctx = canvas.getContext("2d");
	}
	
	this.getCanvas = function(){
		return this.canvas;	
	}

	this.setDirection = function(direction){
		if(direction != this.getDirection()){
			if(direction == "right"){
				var posx = this.getPosX();
				//console.log(posx + " - " + this.width + " = " + (posx-this.width));
				this.setPosX(posx - this.width);
			}else{
				var posx = this.getPosX();
				//console.log(posx + " - " + this.width + " = " + (posx-this.width));
				this.setPosX(posx + this.width);
			}
			this.direction = direction;
		}	
	}

	this.getDirection = function(direction){
		return this.direction;
	}
	
	/*this.animate = function(){
		this.animation = setInterval(function(self){
			return(function(){
				self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height);
				
				if(self.frame > self.frames-1){
					self.frame = 0;
				}
					
				try{
					self.ctx.drawImage(self.getImage(self.frame),self.getPosX(),self.getPosY());
				}
				catch(e){
					alert("FAIL");	
				}
				
				self.frame+=1;
			});
		}(this),1000/60);	
	}*/
	
	this.getActualFrame = function(){

		var frame = this.state.frame;
		
		if(frame == this.state.sprites.length){
			console.log("TERMINO");
			this.state.frame = 0;
			frame = 0;
		}

		return this.state.sprites[frame];
	}
	
	this.drawSprite = function(){

		if(this.direction == "left"){
			this.reviewState();

			this.ctx.save();

			this.ctx.translate(this.canvas.width,0);
			this.ctx.scale(-1,1);

			this.ctx.drawImage(this.getActualFrame(),this.canvas.width-this.getPosX(),this.getPosY());
			
			this.ctx.restore();
		}else{
			this.reviewState();
			this.ctx.drawImage(this.getActualFrame(),this.getPosX(),this.getPosY());
		}
		
		//this.setWidth(this.images[this.frame].width);
		//this.setHeight(this.images[this.frame].height);
		//this.setPixels(this.ctx.getImageData(this.getPosX(),this.getPosY(),this.getWidth(),this.getHeight()).data);
		
		this.state.frame++;
	}
	
	// MASK CANVAS
	
	this.setCanvasMask = function(canvas){
		this.mcanvas = canvas;
		this.mctx = canvas.getContext("2d");
	}
	
	// DRAW MASK 
	
	this.drawMask = function(){
		if(this.direction == "left"){
			
			this.mctx.save();
			
			this.mctx.translate(this.mcanvas.width,0);
			this.mctx.scale(-1,1);

			this.mctx.drawImage(this.getActualFrame(),this.mcanvas.width - this.getPosX(),this.getPosY());
			
			//console.log(this.getPosX());
			
			this.setWidth(this.getActualFrame().width);
			this.setHeight(this.getActualFrame().height);

			this.mctx.restore();

			//console.log(this.getPosX());

			//this.mctx.fillRect(this.getPosX() - this.getWidth(),this.getPosY(),this.getWidth(),this.getHeight());
			
			this.setPixels(this.mctx.getImageData(this.getPosX() - this.getWidth(),this.getPosY(),this.getWidth(),this.getHeight()).data);
			
						
		}else{
			//this.mctx.fillRect(this.getPosX() - this.width,this.getPosY(),this.getWidth(),this.getHeight());
			this.mctx.drawImage(this.getActualFrame(),this.getPosX(),this.getPosY());
			this.setWidth(this.getActualFrame().width);
			this.setHeight(this.getActualFrame().height);

			//this.mctx.fillRect(this.getPosX() - this.width,this.getPosY(),this.getWidth(),this.getHeight());

			this.setPixels(this.mctx.getImageData(this.getPosX(),this.getPosY(),this.getWidth(),this.getHeight()).data);	
		}
	}
	
	
	
	this.setPixels = function(pixels){
		var realPixels = [];
		var x = 0;
		var y = 0;
		var _posX = this.getPosX();
		var _posY = this.getPosY();
		
		var sw = false;
		
		for(var i=0;i<pixels.length;i+=4){
			var pixel = {
					red : pixels[i],
					green : pixels[i+1],
					blue : pixels[i+2],
					alpha : pixels[i+3],
					color : pixels[i] + pixels[i+1] + pixels[i+2],
					offsetX : _posX + x,
					offsetY : _posY + y,
					posX : x,
					posY : y
				}
			
			//alert(pixel.offsetX + "," + pixel.offsetY); // 308
			//this.ctx.fillStyle = "#000";
			//this.ctx.globalCompositeOperation ="source-over";
			//this.ctx.fillRect(pixel.offsetX,pixel.offsetY,1,1);
			//this.ctx.fillStyle = "#C72B28";
			//this.ctx.globalCompositeOperation ="xor";
				
				//alert(pixel.posX + "," + pixel.posY);
			if(sw == false)sw=true;
				
				
			if(pixel.alpha != 255){
				realPixels.push(pixel);
			}
			
			x++;
			//alert(this.getWidth());
			if(x >= this.getWidth()){
				x = 0;
				y++;
			}			
		}
		
		this.pixels = realPixels;
		//alert("EN SETPIXELS : " + this.pixels.length);
	}
	
	this.getMaskPixels = function(){
		if(this.direction == "left"){
			return this.mctx.getImageData(this.getPosX() - this.getWidth(),this.getPosY(),this.getWidth(),this.getHeight());	
		}else{//this.mctx.fillRect(this.getPosX(),this.getPosY(),this.getWidth(),this.getHeight());
			return this.mctx.getImageData(this.getPosX(),this.getPosY(),this.getWidth(),this.getHeight());	
		}
	}
	
	this.getPixels = function(){
		return this.pixels;
	}
	
	// DETECT COLLISION WITH A MASK
	
	// Who hits whom?
	this.detectCollision = function(){
		var imageData = this.getMaskPixels();

		// Si su último estado fue diferente de atacar entonces fue herido.

		for(var i=0;i<this.getPixels().length;i++){
			var _pixel = this.getPixels()[i];
			
			var offset = ((_pixel.posY*(imageData.width*4)) + (_pixel.posX*4));
						
			var newPixel = {
				red : imageData.data[offset+0],
				green : imageData.data[offset+1],
				blue : imageData.data[offset+2],
				alpha : imageData.data[offset+3],
				color : imageData.data[offset+0] + imageData.data[offset+1] + imageData.data[offset+2]
			}
			
			//if(i==0)console.log(_pixel),console.log(newPixel);
			
			if(_pixel.alpha != newPixel.alpha){
				alert("COLISI\u00d3N DETECTADA");
				//console.log("COLLISION" + this);
				this.collided = true;
			}
			
			//if(this.collided) break;			
		}
	}
	// MOVE RIGHT	
	this.moveRight = function(){
		this.setDirection("right");
		this.setState("moving");
		
		var position = this.getPosX();
		position += this.velocity;
		this.setPosX(position);
	}

	// MOVE LEFT	
	this.moveLeft = function(){
		this.setDirection("left");
		this.setState("moving");
		
		var position = this.getPosX();
		position -= this.velocity;
		this.setPosX(position);
		//console.log(this.posX  + " , " + this.posY);
	}

	// MOVE UP	
	this.moveUp = function(){
		var position = this.getPosY();
		position -= this.velocity;
		this.setPosY(position);
	}
	
	// MOVE DOWN
	this.moveDown = function(){
		var position = this.getPosY();
		position += this.velocity;
		this.setPosY(position);
	}

	// MOVE RIGHT	
	this.kick1 = function(){
		this.setState("pateando");
	}

	// JUMP	
	this.jump = function(){
		var self = this;

		this.state = {
			type : "jumping",
			posX : self.posX,
			posY : self.posY,
			steps : 0,
			maxSteps : 3
		};
	}

	// REVIEW STATE : JUMPING, BREATHING, etc ...
	this.reviewState = function(){
		var state = this.state;
		
		if(state != null){

			/*if(this.state.name == "pateando"){
				// ANIMATION OF "PATEANDO"
				console.log(this.state.name);
			}*/

			//if(this.state.name == "moving"){
			if(this.state.name != "idle")
				//console.log(this.state.action.step);
				if(this.state.action.step < this.state.action.steps){
					this.state.action.step++;
					console.log(this.state.action.step)
					
				}else{
					this.setState("idle");
				}
			//}

			// JUMPING
			/*if(state.type == "jumping"){
				//console.log("SALTANDO");
					if(state.steps <= state.maxSteps){
						this.posY -=10;
						state.steps++;
					}else {
						if(this.posY != state.posY){
							this.posY += 10;
						}else{
							this.state = "normal";	
						}
					}
			}*/
		}
	}
	
}