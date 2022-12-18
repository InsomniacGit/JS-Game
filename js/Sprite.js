class Sprite {

    constructor({position, imageSrc, frameRate = 1}) {
        this.position = position
        this.image = new Image()
        this.image.onload = () => {
            this.loaded = true
            this.width = 56
            this.height = 42
        }
        this.image.src = imageSrc
        this.loaded = false
        this.frameRate = frameRate
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = 1
        this.slowDown = 0
    }
    
    draw() {
        c.save()
        if (!this.loaded) return

        
        const cropbox = {
            position: {
                x: (this.image.width / this.frameRate * this.currentFrame) + 13,
                y: 24,
            },
            width: this.width,
            height: this.height,
        }

        c.drawImage(
            this.image,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.slowDown += 1
        if (this.slowDown % 5 === 0){
            this.updateFrames()
        }
        //c.drawImage(this.image, this.position.x, this.position.y)
        c.restore()
    }

    updateFrames() {
        this.currentFrame++
        this.elapsedFrames++

        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) this.currentFrame++
            else this.currentFrame = 0
        }
    }
}