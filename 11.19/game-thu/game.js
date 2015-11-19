"use strict";

var numberOfBlocks = 9;
var targetBlocks = [];
var trapBlock;
var targetTimer;
var trapTimer;
var instantTimer;
var point = 0;

document.observe('dom:loaded', function(){
	$("start").observe("click", function(){
		$("state").textContent = "Ready!";
		$("score").textContent = point;
		clearTimeout(targetTimer);
		clearTimeout(trapTimer);
		clearTimeout(instantTimer);
		setTimeout(startGame, 3000);
	});
	$("stop").observe("click", stopGame);
	var allblocks = $$("#blocks");
	for(var i=0;i<numberOfBlocks;i++){
		allblocks[i].observe("click",function(){
			if(allblocks[i].hasClassName("normal")){
				point = point - 10;
				allblocks[i].addClassName("wrong");
				setTimeout(afterRemove, 100, i);
			} else if (allblocks[i].hasClassName("target")){
				point = point + 20;
				allblocks[i].removeClassName("target");
			} else if (allblocks[i].hasClassName("trap")){
				point = point - 30;
				allblocks[i].removeClassName("trap");
			}
			$("score").textContent = point;
		});
	}
});

function startGame(){
	numberOfBlocks = 9;
	targetBlocks = [];
	trapBlock = 0;
	clearTimeout(targetTimer);
	clearTimeout(trapTimer);
	clearTimeout(instantTimer);
	startToCatch();
}

function stopGame(){
	numberOfBlocks = 9;
	targetBlocks = [];
	trapBlock = 0;
	clearTimeout(targetTimer);
	clearTimeout(trapTimer);
	clearTimeout(instantTimer);
	$("state").textContent = "Stop";
}

function startToCatch(){
	$("state").textContent = "Catch!";
	targetTimer = setInterval(showTargetBlock, 1000);
	trapTimer = setInterval(showTrapBlock, 3000);
}

function showTargetBlock(){
	var allblocks = $$(".block");
	var randomNum = Math.floor(Math.random() * numberOfBlocks);
	while(1){
		if(allblocks[randomNum].hasClassName("normal")){
			allblocks[randomNum].addClassName("target");
			targetBlocks.push(randomNum);
			break;
		} else {
			randomNum = Math.floor(Math.random() * numberOfBlocks);
		}
	}
	
	if(targetBlocks.length > 4){
		clearTimeout(targetTimer);
		clearTimeout(trapTimer);
		clearTimeout(instantTimer);
		alert("you Lose!");
		for(var i=0;i<numberOfBlocks;i++){
			allblocks[i].stopObserving("click");
		}
	}
}

function showTrapBlock(){
	var allblocks = $$(".block");
	var randomNum = Math.floor(Math.random() * numberOfBlocks);
	targetBlocks.push(randomNum);
	allblocks[randomNum].addClassName("trap");
	setTimeout(reset, 2000, randomNum);
}
function reset(num) { 
	var allblocks = $$(".block");
	allblocks[num].removeClassName("wrong");
}
function afterRemove(num) { 
	var allblocks = $$(".block");
	allblocks[num].removeClassName("wrong");
}
