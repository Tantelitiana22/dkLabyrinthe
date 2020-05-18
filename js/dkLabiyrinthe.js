import {StartGame,Level,Kong} from "./classes.js";
import {levelOne, levelTwo,window_size} from "./constantes.js";


let playLab = new StartGame();
let ctx = playLab.context;
let isSuccess = false;
playLab.start();
playLab.titleGame(isSuccess);

document.addEventListener("keydown",choiceLevel);


let struct;
function choiceLevel(e){
    let levelChoice;
    switch(e.keyCode) {
        case 112:
            levelChoice = new Level(levelOne,ctx);
            break;
        case 113:
            levelChoice = new Level(levelTwo,ctx);
            break;
    }
    if(levelChoice){
        document.removeEventListener("keydown",choiceLevel);
        levelChoice.buildStructures();
        levelChoice.drawGame();
        struct = levelChoice.structures;
        document.addEventListener("keydown",moveTheMonkey);
        let kong = new Kong(0,0,struct,ctx);
        kong.initPosition();
        let temp = ctx.getImageData(40,40,40,40);
        function moveTheMonkey(e){
            let movement;
            switch(e.keyCode){
                case 37:
                    movement ="left";
                    break;
                case 39:
                    movement ="right";
                    break;
                case 40:
                    movement = "down";
                    break;
                case 38:
                    movement = "up";
                    break;
            }
            if(movement){
                kong.moveKong(movement);
                if(kong.gameOver()){
                    isSuccess=true;
                    playLab.titleGame(isSuccess);
                    document.removeEventListener("keydown",moveTheMonkey)
                    document.addEventListener("keydown",choiceLevel);
                }
            }
        }
    }
}