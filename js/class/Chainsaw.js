//CHAINSAW INITIALISATION
class Chainsaw {
    constructor(x, y, width, height) {
        this.position = {
            x: x,
            y: y,
        }

        this.width = width
        this.height = height

        this.sides = {
            bottom: this.position.y + this.height,
            top: this.position.y,
            right: this.position.x + this.width,
            left: this.position.x,
        }
    }

    // isOnGround(player) {
    //     // TODO
    // }


    draw() {
        c.save()
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.restore()
    }


    // update() {

    // }

}