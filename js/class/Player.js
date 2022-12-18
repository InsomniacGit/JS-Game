//PLAYER INITIALISATION
class Player extends Sprite{
    constructor({imageSrc, frameRate}) {
        super({imageSrc, frameRate})
        this.position = {
            x: 100,
            y: 100,
        }

        this.velocity ={
            x: 0,
            y: 0,
        }

        //this.width = 50
        //this.height = 50

        this.sides = {
            bottom: this.position.y + this.height,
            top: this.position.y,
            right: this.position.x + this.width,
            left: this.position.x,
        }

        this.cooldown ={
            dash: true,
            jumping: true,
            onGround: false,
            onWall: false,
        }

        this.gravity = 1
    }

    /*draw() {
        c.save()
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.restore()
    }*/

    update() {

        // HitBox
        // c.fillStyle = 'rgba(0, 0, 255, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)


        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.sides.top = this.position.y
        this.sides.bottom = this.position.y + this.height
        this.sides.left = this.position.x
        this.sides.right = this.position.x + this.width


        //gravity
        if (this.sides.bottom + this.velocity.y < canvas.height) {
            this.velocity.y += this.gravity
        } else this.velocity.y = 0
        
        // movement speed limit
        if (this.velocity.x > 10) {
            this.velocity.x = 10
        } else if (this.velocity.x < -10) {
            this.velocity.x = -10
        }
        if (this.velocity.y > 15) {
            this.velocity.y = 15
        }
        else if (this.velocity.y < -15) {
            this.velocity.y = -15
        }

        //Player collision Canvas Left and Right
        if (this.sides.left < 0){
            this.position.x = 0
            //console.log("Trop à gauche")
        } else if (this.sides.right > canvas.width){
            this.position.x = canvas.width - player.width
            //console.log("Trop à droite")
        }

        //Player collision Canvas Bottom and Top
        if (this.sides.bottom > canvas.height){
            this.position.y = canvas.height - player.height
            //console.log("Trop bas")
        } else if (this.sides.top < 0){
            this.position.y = 0
            //console.log("Trop haut")
        }


        // Issue with the sprite changing, we lost an image in the sprite sheet
        // Losing the player sprite animation for few frame
        // Player sprite animation
        // if (this.velocity.y < -2 || this.velocity.y > 2) {
        //     this.image.src = '../../assets/SpritePerso/King/Jump (78x58).png'
        //     this.frameRate = 1
        // } else if (this.velocity.y > 2) {
        //     this.image.src = '../../assets/SpritePerso/King/Fall (78x58).png'
        //     this.frameRate = 1
        // } else if (this.velocity.x > 2 || this.velocity.x < -2) {
        //     this.image.src = '../../assets/SpritePerso/King/Run (78x58).png'
        //     this.frameRate = 8
        // }
        // else {
        //     this.image.src = '../../assets/SpritePerso/King/idle.png'
        //     this.frameRate = 11
        // }



    }
}
