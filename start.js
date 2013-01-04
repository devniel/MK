// JavaScript Document
function startGame(sprites){
	
	var canvas,ctx,mask,mctx;

	canvas = document.getElementById("arena");
	canvas.style.background = "#FFF";
	ctx = canvas.getContext("2d");
	
	mask = document.getElementById("mask");
	mask.style.background = "#FFF";
	mctx = mask.getContext("2d");
	mctx.fillStyle = "#C72B28";
	mctx.globalCompositeOperation ="xor";

	var players = new Array();
	
	var liuKan = new Character();
	
	liuKan.set({
			canvas : canvas,
			mask : mask,
			posX : 50,
			posY : 150,
			sprites : sprites,
			direction : "right",
	});

	players.push(liuKan);

	var liuKan2 = new Character();
	
	liuKan2.set({
			canvas : canvas,
			mask : mask,
			posX : 550,
			posY : 150,
			sprites : sprites,
			direction : "left",
	});

	players.push(liuKan2);


	var CONTROLLED = liuKan2;


	// CONTROLLER
	// Keyboard input with customisable repeat (set to 0 for no key repeat)
	//
	function KeyboardController(keys, repeat) {
	    // Lookup of key codes to timer ID, or null for no repeat
	    //
	    var timers= {};

	    // When key is pressed and we don't already think it's pressed, call the
	    // key action callback and set a timer to generate another one after a delay
	    //
	    window.onkeydown= function(event) {
	        var key= (event || window.event).keyCode;
	        if (!(key in keys))
	            return true;
	        if (!(key in timers)) {
	            timers[key]= null;
	            keys[key]();
	            if (repeat!==0)
	                timers[key]= setInterval(keys[key], repeat);
	        }
	        return false;
	    };

	    // Cancel timeout and mark key as released on keyup
	    //
	    window.onkeyup= function(event) {
	        var key= (event || window.event).keyCode;
	        if (key in timers) {
	            if (timers[key]!==null)
	                clearInterval(timers[key]);
	            delete timers[key];
	        }
	    };

	    // When window is unfocused we may not get key events. To prevent this
	    // causing a key to 'get stuck down', cancel all held keys
	    //
	    window.onblur= function() {
	        for (key in timers)
	            if (timers[key]!==null)
	                clearInterval(timers[key]);
	        timers= {};
	    };
	};

	KeyboardController({
    	37: function() { CONTROLLED.moveLeft(); },
    	38: function() { /*CONTROLLED.moveUp()*/ },
    	39: function() { CONTROLLED.moveRight() },
    	40: function() { /*CONTROLLED.moveDown();*/ },
    	32: function() { CONTROLLED.kick1();}
	}, 60);

	/*window.addEventListener("keydown",function(event){
		if(CONTROLLED != null){
			if(event.keyCode == 39){
				CONTROLLED.moveRight();	
				event.preventDefault();		
			}else if(event.keyCode == 40){
				CONTROLLED.moveDown();
				event.preventDefault();
			}else if(event.keyCode == 38){
				CONTROLLED.moveUp();
				event.preventDefault();
			}else if(event.keyCode == 37){
				CONTROLLED.moveLeft();
				event.preventDefault();
			}else if(event.keyCode == 32){
				CONTROLLED.jump();
				event.preventDefault();
			}
		}
	},false);*/

	window.addEventListener("keyup",function(event){
		if(CONTROLLED != null){
			if(CONTROLLED.getState() != "pateando"){
				CONTROLLED.setState("idle");	
			}
			event.preventDefault();		
		}
	},false);
	
	var j = 0;
	
	var animation = setInterval(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		mctx.clearRect(0,0,canvas.width,canvas.height);
		
		// GLOBAL RECT for make the XOR Composition
		mctx.fillRect(0,0,mask.width,mask.height);

		//mctx.fillRect(liuKan.getPosX(),liuKan.getPosY(),liuKan.getWidth(),liuKan.getHeight());
		//mctx.fillRect(liuKan2.getPosX(),liuKan2.getPosY(),liuKan2.getWidth(),liuKan2.getHeight());
		//mctx.fillRect(liuKan3.getPosX(),liuKan3.getPosY(),liuKan3.getWidth(),liuKan3.getHeight());
		
		for(var i in players){
			players[i].drawSprite();
			players[i].drawMask();
		}
		//liuKan.d
		//liuKan.drawMask();
		
		// Ball		
		/*ctx.beginPath();
		ctx.arc(canvas.width/2 , j, 10, 0, Math.PI*2, 1);
		ctx.fill();
		ctx.closePath();
		
		mctx.beginPath();
		mctx.arc(canvas.width/2 , j, 10, 0, Math.PI*2, 1);
		mctx.fill();
		mctx.closePath();*/
		
		// COLISSION
		

		for(var p in players){
			//console.log("PLAYER " + p + " : " + players[p].collided);
			if(!players[p].collided){
				players[p].detectCollision();
			}
		}

		j++;
	},1000/20);

}
	

