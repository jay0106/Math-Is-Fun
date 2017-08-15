init()

function init() {
	setUpGame("Easy", "+");
	setupModeButtons();	
	setupTypeButtons();
}

function setUpGame(mode, type) {
	$("#answer").text("Math is Fun!!!!!").css("font-size", "40px");;
	doAnimation();
	setUpSquares(); //click listener
	randomColorForSquares(); 
	
	$(".firstNum").each(function() {
		$(this).text(generateRandomMathProblems(mode, type));
	});

	setUpSign(type);
	
	//keep the second number between 1 to 10 for * 
	if(type === "*") {
		$(".secondNum").each(function() { 
			$(this).text(getSecondNum(mode, type));
		});	
	}else {
		$(".secondNum").each(function() { 
			$(this).text(generateRandomMathProblems(mode, type));
		});			
	}
}

function setUpSign(type) {
	if(type === "+") {
		$(".sign").each(function() {
			$(this).text("+");
		});	
	}else if(type === "-") {
		$(".sign").each(function() {
			$(this).text("-");
		});	
	}else {
		$(".sign").each(function() {
			$(this).text("*");
		});	
	}
}

//only for multiplication
function getSecondNum(mode, type){	
	while(true) {
		var secondNum = generateRandomMathProblems(mode, type);	
		if(secondNum < 10) {
			return secondNum;
		}
	}
}

//generates random numbers based on type and level
function generateRandomMathProblems(mode, type){
		if(type === "+" || type === "-") {
			return getNumbersForAdditionOrSubtraction(mode);
		}else {
			return getNumbersForMultiplication(mode);
		}	
}

function getNumbersForAdditionOrSubtraction(mode){
	if(mode === "Easy") {
		return Math.floor(Math.random() * 10) + 1;
	}else if(mode === "Medium") {
		return Math.floor(Math.random() * 50) + 1;
	}else {
		return Math.floor(Math.random() * 100) + 1;
	}
}
function getNumbersForMultiplication(mode) {
	if(mode === "Easy") {
			return Math.floor(Math.random() * 10) + 1;
	}else if(mode === "Medium") {
		return Math.floor(Math.random() * 15) + 1;
	}else {
		return Math.floor(Math.random() * 25) + 1;
	}
}

//random animation for container 
function doAnimation() {
	var animations = ["bounce", "zoomInDown", "zoomIn",
					"zooInLeft","zoomInRight", "zoomInUp"];
	var applyAnimation = animations[Math.floor(Math.random() * animations.length)];
	
	applyAnimation = "animated " + applyAnimation;
	$("#container").addClass(applyAnimation);
	$("#container").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$("#container").removeClass(applyAnimation);
	});
}

function doMath(expr) {
	expr = expr.replace(/\s+/g, ""); //remove spaces
	var nums; //array 
	var operator;
	var num1, num2;
	if(expr.includes("+")) {
		nums = expr.split("+");
		operator = "+";
	}else if(expr.includes("-")){
		nums = expr.split("-");
		operator = "-";
	}else{
		nums = expr.split("*");
		operator = "*";		
	}	
	num1 = parseInt(nums[0]);
	num2 = parseInt(nums[1]);

	//ready for calculation
	if(operator === "+") {
		return (num1 + num2);
	}else if(operator === "-"){
		return (num1 - num2);
	}else {
		return(num1 * num2);
	}
}

//Addition, Subtraction, and Multiplication
function setupTypeButtons() {
	$(".type").on("click", function() {
		$(".type").each(function() { 
			$(this).removeClass("selected");
		});	
		$(this).addClass("selected");
		if($(this).text() === "Addition") {			
			setUpGame(whatModeIsSelected(), "+");
		}else if($(this).text() === "Subtraction") {
			setUpGame(whatModeIsSelected(), "-");
		}else{
			setUpGame(whatModeIsSelected(), "*");
		}		
	});
}

//what is current mode
function whatModeIsSelected() {
	var option;
	$(".mode").each(function() {		
		if($(this).hasClass("selected")) {
			option = $(this).text();
		}					
	});
	return option;		
}

//what is current type
function whatTypeIsSelected() {
	var option;
	$(".type").each(function() {		
		if($(this).hasClass("selected")) {
			if($(this).text() === "Addition"){
				option = "+";
			}else if($(this).text() === "Subtraction"){
				option = "-";				
			}else{
				option = "*";
			}
		}					
	});		
	return option;
}

//Easy, Medium, and Hard
function setupModeButtons() {
	$(".mode").on("click", function() {
		$(".mode").each(function() { 
			$(this).removeClass("selected");			
		});	
		$(this).addClass("selected");
		if($(this).text() === "Easy") {
			setUpGame($(this).text(), whatTypeIsSelected());
		}else if($(this).text() === "Medium") {
			setUpGame($(this).text(), whatTypeIsSelected());
		}else {
			setUpGame($(this).text(), whatTypeIsSelected());
		}
	});	
}

//click event for squares
function setUpSquares() {
	$(".squares").one("click", function() { 
		$("#answer").text("Answer: " + doMath($(this).text()));
		$(this).css("backgroundColor", "#7ae22f");
	});
}

//New Game
$("#reset").click(function() { 	
	reset();
});

function reset() {
	var mode = whatModeIsSelected();
	var type = whatTypeIsSelected();
	setUpGame(mode, type);	
}

function randomColor() {
	var r = Math.floor(Math.random() * 256); 
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	//rgb(r, g, b
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function randomColorForSquares() {
	$(".squares").each(function() {
		$(this).css("backgroundColor", randomColor());
	});
}
