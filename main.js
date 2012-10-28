/* Globales */
FPS = 60;
window.onload = function(){
	
	var numImagesLoaded = 0;

	var totalImages = 16 + 15 + 8;

	var images = {
		liukan : {
			respirando : [],
			pateando : [],
			caminando : []
		}
	}

	// LIU SPRITES
	for(var i=1;i<=16;i++){
		image = new Image();
		image.src = "images/sprites/liu/liu" + i + ".png"
		images.liukan.respirando.push(image);
		image.onload = incrementAndCheckLoading;
	}

	for(var i=1;i<=15;i++){
		image = new Image();
		image.src = "images/sprites/liu_patada/liu_patada" + i + ".png"
		images.liukan.pateando.push(image);
		image.onload = incrementAndCheckLoading;
	}

	for(var i=1;i<=8;i++){
		image = new Image();
		image.src = "images/sprites/liu_caminando/liu_caminando" + i + ".png"
		images.liukan.caminando.push(image);
		image.onload = incrementAndCheckLoading;
	}
	
	// START HERE
	function incrementAndCheckLoading(){
		numImagesLoaded++;
		if(numImagesLoaded == totalImages){
			startGame(images);
		}
	}  
	
	
	
}