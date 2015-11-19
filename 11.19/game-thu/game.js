"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;

document.observe('dom:loaded', function(){
	$("start").observe("click", function(){
		console.log(targetBlocks);
		$("state").textContent = "Ready!";
		$("score").textContent = 0;
		clearInterval(targetTimer);
		clearInterval(trapTimer);
		clearTimeout(instantTimer);
		targetBlocks = [];
		var allblocks = $$(".block");
		for(var i=0;i<numberOfBlocks;i++){
			allblocks[i].removeClassName("target");
			allblocks[i].removeClassName("trap");
			allblocks[i].addClassName("normal");
		}
		setTimeout(startGame, 3000);
	});
	$("stop").observe("click", stopGame);
});

function startGame(){
	$("state").textContent = "Ready!";
	for(var i=0;i<numberOfBlocks;i++){
		$$(".block")[i].stopObserving("click");
	}
	targetBlocks = [];
	trapBlock = null;
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearTimeout(instantTimer);
	startToCatch();
}

function stopGame(){
	for(var i=0;i<numberOfBlocks;i++){
		$$(".block")[i].stopObserving("click");
	}
	clearInterval(targetTimer);
	clearInterval(trapTimer);
	clearTimeout(instantTimer);
	targetBlocks = [];
	trapBlock = null;
	$("state").textContent = "Stop";
}

function startToCatch(){
	$("state").textContent = "Catch!";
	targetTimer = setInterval(showTargetBlock, 1000);
	trapTimer = setInterval(showTrapBlock, 3000);
	var allblocks = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		allblocks[i].observe("click",function(){
			var point = parseInt($("score").textContent);
			if(this.hasClassName("normal")){
				$("score").textContent = point - 10;
				this.addClassName("wrong");
				setTimeout(afterRemove, 100, this);
			} else if (this.hasClassName("target")){
				$("score").textContent = point + 20;
				this.removeClassName("target");
				this.addClassName("normal");
				targetBlocks.pop();
			} else if (this.hasClassName("trap")){
				$("score").textContent = point - 30;
				this.removeClassName("trap");
				this.addClassName("normal");
			}
		});
	}
}

function showTargetBlock(){
	console.log(targetBlocks);
	var allblocks = $$(".block");
	var randomNum = Math.floor(Math.random() * numberOfBlocks);
	while(1){
		if(allblocks[randomNum].hasClassName("normal")){
			targetBlocks.push(randomNum);
			allblocks[randomNum].removeClassName("normal");			
			allblocks[randomNum].addClassName("target");
			break;
		} else {
			randomNum = Math.floor(Math.random() * numberOfBlocks);
		}
	}
	
	if(targetBlocks.length > 4){
		alert("you Lose!");
		stopGame();
	}
}

function showTrapBlock(){
	var allblocks = $$(".block");
	var randomNum = Math.floor(Math.random() * numberOfBlocks);
	while(1){
		if(allblocks[randomNum].hasClassName("normal")){
			trapBlock = randomNum;
			allblocks[randomNum].addClassName("trap");
			allblocks[randomNum].removeClassName("normal");		
			break;
		} else {
			randomNum = Math.floor(Math.random() * numberOfBlocks);
		}
	}
	instantTimer = setTimeout(reset, 2000);
}
function reset() { 
	var allblocks = $$(".block");
	allblocks[trapBlock].removeClassName("trap");
	allblocks[trapBlock].addClassName("normal");		
}
function afterRemove(victim) {
	var allblocks = $$(".block");
	victim.removeClassName("wrong");
	victim.addClassName("normal");			
}
