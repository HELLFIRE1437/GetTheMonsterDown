class BakeMono{
    constructor(x,y,width,height){
        var options = {
            isStatic : false ,
            restitution : 0.7 ,
            density : 1 ,
            friction : 0.9 
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width ;
        this.height = height ;
        this.image1 = loadImage("images/monster1.png");
        this.image2 = loadImage("images/monster2.png");
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position ;
        var angle = this.body.angle ;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image2,0,0,this.width,this.height);
        pop();
    }
}