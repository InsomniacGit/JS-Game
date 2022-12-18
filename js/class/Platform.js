//PLATFORM INITIALISATION
class Platform {
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
        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
        c.restore()
    }


    checkCollision(player, platform) {
        platform.forEach(platform => {

            // Colision between the top of the platform and the bottom of player
            if(player.sides.top < platform.sides.bottom && player.sides.top > platform.sides.bottom-20 && player.sides.left < platform.sides.right && player.sides.right > platform.sides.left){
                player.position.y = platform.sides.bottom
                player.velocity.y = 0
            }
    
            // Colision between the bottom of the platform and the top of player
            else if(player.sides.bottom > platform.sides.top && player.sides.bottom < platform.sides.top+20 && player.sides.left < platform.sides.right && player.sides.right > platform.sides.left){
                player.position.y = platform.sides.top - player.height
                player.velocity.y = 0
                player.cooldown.onGround = true
                player.cooldown.jumping = true
    
                if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onGround){
    
                    sound.playJumpSound();
                    PlayerJump(15)
                    player.cooldown.jumping = false
                }
            }
    
            // Colision between the left of the platform and the right of player
            else if(player.sides.left < platform.sides.right && player.sides.left > platform.sides.right-20 && player.sides.top < platform.sides.bottom && player.sides.bottom > platform.sides.top){
                player.position.x = platform.sides.right
                player.velocity.x = 0
                player.velocity.y = 2
                player.cooldown.jumping = true
                player.cooldown.onWall = true
                if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onWall){
                    
                    sound.playJumpSound();
                    PlayerSpeedRight(10)
                    PlayerJump(10)
                    player.cooldown.jumping = false
                }
            }
    
            // Colision between the right of the platform and the left of player
            else if(player.sides.right > platform.sides.left && player.sides.right < platform.sides.left+20 && player.sides.top < platform.sides.bottom && player.sides.bottom > platform.sides.top){
                player.position.x = platform.sides.left - player.width
                player.velocity.x = 0
                player.velocity.y = 2
                player.cooldown.jumping = true
                player.cooldown.onWall = true
                if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onWall){
                    
                    sound.playJumpSound();
                    PlayerSpeedLeft(10)
                    PlayerJump(10)
                    player.cooldown.jumping = false
                }
            }
    
            c.save()
            platform.draw()
            c.restore()
        })
    }

}