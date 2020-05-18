import {
    arrival,
    depart,
    dk_bas,
    dk_droite,
    dk_gauche,
    dk_haut,
    fond,
    gridSize,
    image_lab,
    mur,
    window_size
} from "./constantes.js";

export class StartGame{
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window_size[0];
        this.canvas.height = window_size[1];
        this.canvas.style.left = "35%";
        this.canvas.style.top = "10%";
        this.canvas.style.position = "absolute";
        this.canvas.style.backgroundColor="black";
        this.context = this.canvas.getContext("2d");
    }
    start(){
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
    titleGame(isSuccess){
        this.context.fillStyle    = '#0000ff';
        this.context.font="30px Arial";
        this.context.textAlign = 'center';
        this.context.fillStyle ="white";
        if(!isSuccess){
            this.context.fillText("Welcome to dk labyrinthe",window_size[0]/2 ,window_size[1]/6);
        }else{
            this.context.fillText("Congratulation for your success, play again",window_size[0]/2 ,window_size[1]/6);
        }
        this.context.fillText("F1 - level 1",window_size[0]/2 ,window_size[1]-window_size[1]/6);
        this.context.fillText("F2 - level 2",window_size[0]/2 ,window_size[1]-window_size[1]/10);

        let ctx = this.context;
        let image = new Image();
        image.src = image_lab;
        image.onload =function() {
            ctx.drawImage(image, ctx.canvas.width / 4, ctx.canvas.height / 4);
        }
    }
}

export class Level{
    constructor(level,ctx){
        this.level = level;
        this.structures=[];
        this.context = ctx;
    }
    // Function how allow us to draw the area game.
    buildStructures(){
        this.level = this.level.split("\n");

        this.level.forEach(
            line=>{
                this.structures.push(line.split(""));
            }
        );
    }

    drawGrid(ctx,url_image,x,y,width,height) {
        let img = new Image();
        img.src = url_image;
        img.onload=function(){
            ctx.drawImage(img, x, y, width,height);
        }
    }
    //Draw the platform for the game.
    drawGame(){
        this.drawGrid(this.context,fond,0,0,window_size[0],window_size[1]);
        for(let i=0;i<this.structures.length;i++){
            for(let j=0;j<this.structures[i].length;j++){
                if(this.structures[i][j] === "m") {
                    this.drawGrid(this.context, mur, i * gridSize, j * gridSize,gridSize,gridSize);
                }
                if(this.structures[i][j] === "a"){
                    this.drawGrid(this.context,arrival, i * gridSize, j * gridSize,gridSize,gridSize);
                }
                if(this.structures[i][j] === "d"){
                    this.drawGrid(this.context,depart, i * gridSize, j * gridSize,gridSize,gridSize);
                }
            }
        }
    }
}

export class Kong{
    constructor(x,y,structures,ctx){
        this.x=x;
        this.y=y;
        this.dkBas = dk_bas;
        this.dkHaut = dk_haut;
        this.dkDroite = dk_droite;
        this.dkGauche = dk_gauche;
        this.direction = this.dkDroite;
        this.structures = structures;
        this.context =ctx;
        this.pixelGrid=null;

    }

    initPosition(){
        this.drawGrid(this.context,this.direction,0,0,gridSize,gridSize);
    }

    drawGrid(ctx,direction,x,y,width,height) {
        let img = new Image();
        img.src = direction;
        img.onload=()=>{
            console.log("draw success");
            ctx.drawImage(img, x, y, width,height);
        }
    }

    hideKong(){
        if(this.x ===0 && this.y ===0){
            this.drawGrid(this.context,depart,0,0,gridSize,gridSize);
        }else{
            this.context.putImageData(this.pixelGrid,this.x*gridSize,this.y*gridSize);
        }
    }

    moveKong(direction){

        this.hideKong();
        if(this.x<window_size[0]/gridSize-1){
            if(this.structures[this.x+1][this.y] !=="m" && direction ==="right"){
                this.x++;
                this.direction = this.dkDroite;
            }
        }
        if(this.x>0){
            if(this.structures[this.x-1][this.y] !=="m" && direction ==="left"){
                this.x--;
                this.direction = this.dkGauche;
            }
        }

        if(this.y>0){
            if(this.structures[this.x][this.y-1] !=="m" && direction ==="up"){
                this.y--;
                this.direction = this.dkHaut;
            }
        }

        if(this.y<window_size[0]/gridSize-1){
            if(this.structures[this.x][this.y+1] !=="m" && direction ==="down"){
                this.y++;
                this.direction = this.dkBas;
            }
        }
        console.log(this.x,this.y);
        this.pixelGrid = this.context.getImageData(this.x*gridSize,this.y*gridSize,gridSize,gridSize);
        this.drawGrid(this.context,this.direction,this.x*gridSize,this.y*gridSize,gridSize,gridSize);
    }

    gameOver(){
        return this.structures[this.x][this.y] === "a";
    }

}

