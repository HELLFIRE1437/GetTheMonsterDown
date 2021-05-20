class Box{
    constructor(x,y,width,height){
        var options = {
            isStatic : false ,
            restitution : 0.8 ,
            density : 0.8 ,
            friction : 0.6 ,
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width ;
        this.height = height ;
        this.v = 255 ;
        World.add(world, this.body);
    }
    display(){
        var pos = this.body.position ;
        var angle = this.body.angle ;
        if(this.body.speed < 3.6){
            push();
            translate(pos.x,pos.y);
            rotate(angle);
            stroke("black");
            strokeWeight(3);
            fill("red");
            rectMode(CENTER);
            rect(0,0,this.width,this.height);
            pop();
        }
        else {
            push();
            this.v = this.v - 5;
            noStroke();
            fill(255,0,0,this.v);
            rect(pos.x , pos.y , this.width, this.height);
            World.remove(world,this.body);
            pop();
        }
        if(this.v < 200 && this.v > 145){
            score++ ;
        }
        if(gameState === "lost"){
            Matter.Body.setVelocity(this.body,{x:0,y:0});
            Matter.Body.setAngularVelocity(this.body,0);
        }
    }
}