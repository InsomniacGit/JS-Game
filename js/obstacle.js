export default class Obstacle {
    constructor(canvasWidth, canvasHeight) {

        do {
            this.x = Math.random() * (canvasWidth-100);
            this.y = Math.random() * (canvasHeight-100);
        } while(((this.x>canvasWidth/2-300) && (this.x<canvasWidth/2+200)) && ((this.y>canvasHeight/2-300) && (this.y<canvasHeight/2+200)));

        this.width = 100;
        this.height = 100;
        const r = Math.floor(Math.random()*255);
        const g = Math.floor(Math.random()*255);
        const b = Math.floor(Math.random()*255);
        this.color = "rgb(" + r + "," + g + "," + b + ")";
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }
}