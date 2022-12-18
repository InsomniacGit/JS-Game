//DASHSEED INITIALISATION
class DashSeed {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y,
        }

        this.width = 20
        this.height = 20

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
        c.fillStyle = 'violet'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.restore()
    }
}