class Hero{
    constructor(x,y,width,height){
        var options = {
            isStatic : false ,
            restituion : 0 ,
            density : 1 ,
            friction : 0.9
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.width = width ;
        this.height = height ;
        this.image = loadImage("images/superhero1.png");
        World.add(world,this.body);
    }
    display(){
        var pos = this.body.position ;
        var angle = this.body.angle ;
        push();
        translate(pos.x,pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,this.width,this.height);
        pop();
    }
}