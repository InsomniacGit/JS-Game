function level0DashKey(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(150, 300, 25, canvas.height - 100))              //Wall Vertical 1
    platform.push(new Door(canvas.width - 200, canvas.height - 220, 120, 120))
 


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



    const key = []

    key.push(new Key(152, 150))
    


    key.forEach(key => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= key.sides.left && player.position.x <= key.sides.right && player.position.y + player.height >= key.sides.top && player.position.y <= key.sides.bottom) {
            level = "0Dash"
        }

        c.save()
        key.draw()
        c.restore()
    })
    
    
 

    const chainsaw = []

    chainsaw.push(new Chainsaw(1000, 300, 25, canvas.height))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })


    const finish = []

    finish.push(new Finish(canvas.width - 150, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "1Dash"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })



    const dashSeed = []

    dashSeed.push(new DashSeed(canvas.width/2 - 60, canvas.height - 150))
    


    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "0Key"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })
    

    c.save()
    c.font = "20px Arial";
    c.fillText("'z' to jump", canvas.width/2 - 100, 150);
    c.fillText("'q' to left", canvas.width/8*3 - 100, 200);
    c.fillText("'d' to right", canvas.width/8*5 - 100, 200);
    c.fillText("'r' to restart", canvas.width/2 - 100, 300);
    c.fillText("Reload the page to reboot", canvas.width - 250, 20);
    c.fillText("'a' to dash while moving", canvas.width/2 - 150, 400);
    c.fillText("You can dash only if", canvas.width/2 - 150, 480);
    c.fillText("You take a 'DashSeed'", canvas.width/2 - 150, 500);
    c.fillText("DashSeed", canvas.width/2 - 100, canvas.height - 160);
    c.fillText("Finish", canvas.width - 170, canvas.height - 160);
    c.fillText("Wall", 220, canvas.height - 160);
    c.fillText("(slide it)", 205, canvas.height - 140);
    c.fillText("('q' or 'd')", 200, canvas.height - 120);
    c.fillText("Chainsaw", 880, canvas.height - 160);
    c.fillText("(kills you)", 880, canvas.height - 140);
    c.fillText("(dash it)", 885, canvas.height - 120);
    c.fillText("Key", 145, 200);
    c.fillText("(open the door)", 100, 220);
    c.fillText("Door", canvas.width - 165, canvas.height - 230);
    c.restore()
}


function level0Dash(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(150, 300, 25, canvas.height - 100))              //Wall Vertical 1
 


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
    
    
 

    const chainsaw = []

    chainsaw.push(new Chainsaw(1000, 300, 25, canvas.height))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })


    const finish = []

    finish.push(new Finish(canvas.width - 150, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "1Dash"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })



    const dashSeed = []

    dashSeed.push(new DashSeed(canvas.width/2 - 60, canvas.height - 150))
    


    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "0"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })

    c.save()
    c.font = "20px Arial";
    c.fillText("'z' to jump", canvas.width/2 - 100, 150);
    c.fillText("'q' to left", canvas.width/8*3 - 100, 200);
    c.fillText("'d' to right", canvas.width/8*5 - 100, 200);
    c.fillText("'r' to restart", canvas.width/2 - 100, 300);
    c.fillText("Reload the page to reboot", canvas.width - 250, 20);
    c.fillText("'a' to dash while moving", canvas.width/2 - 150, 400);
    c.fillText("You can dash only if", canvas.width/2 - 150, 480);
    c.fillText("You take a 'DashSeed'", canvas.width/2 - 150, 500);
    c.fillText("DashSeed", canvas.width/2 - 100, canvas.height - 160);
    c.fillText("Finish", canvas.width - 170, canvas.height - 160);
    c.fillText("Wall", 220, canvas.height - 160);
    c.fillText("(slide it)", 205, canvas.height - 140);
    c.fillText("('q' or 'd')", 200, canvas.height - 120);
    c.fillText("Chainsaw", 880, canvas.height - 160);
    c.fillText("(kills you)", 880, canvas.height - 140);
    c.fillText("(dash it)", 885, canvas.height - 120);
    c.restore()
}


function level0Key(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(150, 300, 25, canvas.height - 100))              //Wall Vertical 1
    platform.push(new Door(canvas.width - 200, canvas.height - 220, 120, 120))
 


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



    const key = []

    key.push(new Key(152, 150))
    


    key.forEach(key => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= key.sides.left && player.position.x <= key.sides.right && player.position.y + player.height >= key.sides.top && player.position.y <= key.sides.bottom) {
            level = "0"
        }

        c.save()
        key.draw()
        c.restore()
    })
    
    
 

    const chainsaw = []

    chainsaw.push(new Chainsaw(1000, 300, 25, canvas.height))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })


    const finish = []

    finish.push(new Finish(canvas.width - 150, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "1Dash"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })


    c.save()
    c.font = "20px Arial";
    c.fillText("'z' to jump", canvas.width/2 - 100, 150);
    c.fillText("'q' to left", canvas.width/8*3 - 100, 200);
    c.fillText("'d' to right", canvas.width/8*5 - 100, 200);
    c.fillText("'r' to restart", canvas.width/2 - 100, 300);
    c.fillText("Reload the page to reboot", canvas.width - 250, 20);
    c.fillText("'a' to dash while moving", canvas.width/2 - 150, 400);
    c.fillText("Finish", canvas.width - 170, canvas.height - 160);
    c.fillText("Wall", 220, canvas.height - 160);
    c.fillText("(slide it)", 205, canvas.height - 140);
    c.fillText("('q' or 'd')", 200, canvas.height - 120);
    c.fillText("Chainsaw", 880, canvas.height - 160);
    c.fillText("(kills you)", 880, canvas.height - 140);
    c.fillText("(dash it)", 885, canvas.height - 120);
    c.fillText("Key", 145, 200);
    c.fillText("(open the door)", 100, 220);
    c.fillText("Door", canvas.width - 165, canvas.height - 230);
    c.restore()
}



function level0(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(150, 300, 25, canvas.height - 100))              //Wall Vertical 1
 


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
    
    
    const chainsaw = []

    chainsaw.push(new Chainsaw(1000, 300, 25, canvas.height))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })


    const finish = []

    finish.push(new Finish(canvas.width - 150, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "1Dash"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

    c.save()
    c.font = "20px Arial";
    c.fillText("'z' to jump", canvas.width/2 - 100, 150);
    c.fillText("'q' to left", canvas.width/8*3 - 100, 200);
    c.fillText("'d' to right", canvas.width/8*5 - 100, 200);
    c.fillText("'r' to restart", canvas.width/2 - 100, 300);
    c.fillText("Reload the page to reboot", canvas.width - 250, 20);
    c.fillText("'a' to dash while moving", canvas.width/2 - 150, 400);
    c.fillText("Finish", canvas.width - 170, canvas.height - 160);
    c.fillText("Wall", 220, canvas.height - 160);
    c.fillText("(slide it)", 205, canvas.height - 140);
    c.fillText("('q' or 'd')", 200, canvas.height - 120);
    c.fillText("Chainsaw", 880, canvas.height - 160);
    c.fillText("(kills you)", 880, canvas.height - 140);
    c.fillText("(dash it)", 885, canvas.height - 120);
    c.restore()
}



function level1Dash() {

    const platform = []

    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3
    platform.push(new Platform(625, -100, 50, canvas.height - 50))                  //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(850, 150, canvas.width - 950, 50))                   //Wall Horizontal 1
    platform.push(new Platform(925, 275, canvas.width - 900, 50))                   //Wall Horizontal 2
    platform.push(new Platform(850, 400, canvas.width - 950, 50))                   //Wall Horizontal 3
 


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



    const chainsaw = []

    chainsaw.push(new Chainsaw(950, 450, 50, 270))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })
    



    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "2"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })




    const dashSeed = []

    dashSeed.push(new DashSeed(40, canvas.height - 50))
    


    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "1"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })
}


function level1(){
    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3
    platform.push(new Platform(625, -100, 50, canvas.height - 50))                  //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(850, 150, canvas.width - 950, 50))                   //Wall Horizontal 1
    platform.push(new Platform(925, 275, canvas.width - 900, 50))                   //Wall Horizontal 2
    platform.push(new Platform(850, 400, canvas.width - 950, 50))                   //Wall Horizontal 3
 


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(950, 450, 50, 270))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "2"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })
}



function level2(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 200, 50, 150))
    platform.push(new Platform(450, 200, 50, 150))
    platform.push(new Platform(850, 600, 50, 100))


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 250))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "3"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

}


function level3(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, canvas.height - 120, 50, 50))
    platform.push(new Platform(325, canvas.height - 220, 50, 50))
    platform.push(new Platform(550, canvas.height - 320, 50, 50))
    platform.push(new Platform(775, canvas.height - 420, 50, 50))
    platform.push(new Platform(1000, canvas.height - 520, 50, 50))


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))
    chainsaw.push(new Chainsaw(950, canvas.height - 300, 50, 250))
    chainsaw.push(new Chainsaw(1000, canvas.height - 300, 200, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "4Dash"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

}


function level4Dash(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, canvas.height - 120, 100, 50))
    platform.push(new Platform(625, canvas.height - 120, 50, 50))
    platform.push(new Platform(675, canvas.height - 350, 50, 280))
    platform.push(new Platform(450, canvas.height - 350, 50, 50))
    platform.push(new Platform(175, canvas.height - 450, 50, 50))
    platform.push(new Platform(450, canvas.height - 550, 275, 50))


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))
    chainsaw.push(new Chainsaw(950, canvas.height - 520, 50, 270))
    chainsaw.push(new Chainsaw(canvas.width - 50, canvas.height - 520, 50, 470))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "5"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })


    const dashSeed = []

    dashSeed.push(new DashSeed(165, canvas.height - 150))
    


    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "4"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })
}



function level4(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, canvas.height - 120, 100, 50))
    platform.push(new Platform(625, canvas.height - 120, 50, 50))
    platform.push(new Platform(675, canvas.height - 350, 50, 280))
    platform.push(new Platform(450, canvas.height - 350, 50, 50))
    platform.push(new Platform(175, canvas.height - 450, 50, 50))
    platform.push(new Platform(450, canvas.height - 550, 275, 50))


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))
    chainsaw.push(new Chainsaw(950, canvas.height - 520, 50, 270))
    chainsaw.push(new Chainsaw(canvas.width - 50, canvas.height - 520, 50, 470))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "5"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })
}



function level5(){
    const platform = []

    platform.push(new Platform(0, 50, canvas.width, 50))
    platform.push(new Platform(0, 200, canvas.width-200, 50))
    platform.push(new Platform(canvas.width-50, 200, 150, 50))
    platform.push(new Platform(0, 350, 50, 50))
    platform.push(new Platform(200, 350, canvas.width-200, 50))
    platform.push(new Platform(0, canvas.height-50, canvas.width, 50))
 


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(canvas.width/3-25, 175, 50, 25))
    chainsaw.push(new Chainsaw(canvas.width/3*2-25, 175, 50, 25))
    chainsaw.push(new Chainsaw(canvas.width/2-25, 100, 50, 25))
    chainsaw.push(new Chainsaw(canvas.width/3-25, 325, 50, 25))
    chainsaw.push(new Chainsaw(canvas.width/3*2-25, 325, 50, 25))
    chainsaw.push(new Chainsaw(canvas.width/2-25, 250, 50, 25))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 200))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "6"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })
}



function level6(){

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 200, 50, 150))
    platform.push(new Platform(450, 200, 50, 150))
    platform.push(new Platform(850, 600, 50, 100))


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


    const chainsaw = []

    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))
    chainsaw.push(new Chainsaw(600, 0, 50, 225))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })



    const finish = []

    finish.push(new Finish(1100, canvas.height - 250))
    


    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "7"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

}



function level7DashKey() {

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3

    platform.push(new Platform(625, -100, 50, canvas.height - 150))                 //Wall Vertical 4
    platform.push(new Door(625, canvas.height - 250, 50, 200))                      //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(800, 150, canvas.width - 900, 50))                   //Wall Horizontal 1
    platform.push(new Platform(750, canvas.height - 100, 50, 50))                   //Wall Horizontal 2
    platform.push(new Platform(975, 350, canvas.width - 900, 50))                   //Wall Horizontal 3


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



    const key = []

    key.push(new Key(380, canvas.height - 100))
    


    key.forEach(key => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= key.sides.left && player.position.x <= key.sides.right && player.position.y + player.height >= key.sides.top && player.position.y <= key.sides.bottom) {
            level = "7Dash"
        }

        c.save()
        key.draw()
        c.restore()
    })



    const chainsaw = []

    chainsaw.push(new Chainsaw(975, 400, 25, 320))
    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })




    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))



    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "8"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })




    const dashSeed = []

    dashSeed.push(new DashSeed(40, canvas.height - 100))



    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "7Key"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })
}



function level7Dash() {

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3

    platform.push(new Platform(625, -100, 50, canvas.height - 150))                 //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(800, 150, canvas.width - 900, 50))                   //Wall Horizontal 1
    platform.push(new Platform(750, canvas.height - 100, 50, 50))                   //Wall Horizontal 2
    platform.push(new Platform(975, 350, canvas.width - 900, 50))                   //Wall Horizontal 3


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



    const chainsaw = []

    chainsaw.push(new Chainsaw(975, 400, 25, 320))
    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })




    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))



    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "8"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })




    const dashSeed = []

    dashSeed.push(new DashSeed(40, canvas.height - 100))



    dashSeed.forEach(dashSeed => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= dashSeed.sides.left && player.position.x <= dashSeed.sides.right && player.position.y + player.height >= dashSeed.sides.top && player.position.y <= dashSeed.sides.bottom) {
            console.log('Dash available')
            player.cooldown.dash = true
            level = "7"
        }

        c.save()
        dashSeed.draw()
        c.restore()
    })
}


function level7Key() {

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3

    platform.push(new Platform(625, -100, 50, canvas.height - 150))                 //Wall Vertical 4
    platform.push(new Door(625, canvas.height - 250, 50, 200))                      //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(800, 150, canvas.width - 900, 50))                   //Wall Horizontal 1
    platform.push(new Platform(750, canvas.height - 100, 50, 50))                   //Wall Horizontal 2
    platform.push(new Platform(975, 350, canvas.width - 900, 50))                   //Wall Horizontal 3


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



    const key = []

    key.push(new Key(380, canvas.height - 100))
    


    key.forEach(key => {

        //Check if the player is on the rectangle
        if (player.position.x + player.width >= key.sides.left && player.position.x <= key.sides.right && player.position.y + player.height >= key.sides.top && player.position.y <= key.sides.bottom) {
            level = "7"
        }

        c.save()
        key.draw()
        c.restore()
    })



    const chainsaw = []

    chainsaw.push(new Chainsaw(975, 400, 25, 320))
    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })




    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))



    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "8"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

}




function level7() {

    const platform = []

    // X Y Width Height
    platform.push(new Platform(100, 300, 50, canvas.height - 100))                  //Wall Vertical 1
    platform.push(new Platform(275, -100, 50, 475))                                 //Wall Vertical 2
    platform.push(new Platform(275, 525, 50, 250))                                  //Wall Vertical 2
    platform.push(new Platform(450, 150, 50, canvas.height - 100))                  //Wall Vertical 3

    platform.push(new Platform(625, -100, 50, canvas.height - 150))                 //Wall Vertical 4
    platform.push(new Platform(800, 150, 50, canvas.height - 100))                  //Wall Vertical 5


    platform.push(new Platform(800, 150, canvas.width - 900, 50))                   //Wall Horizontal 1
    platform.push(new Platform(750, canvas.height - 100, 50, 50))                   //Wall Horizontal 2
    platform.push(new Platform(975, 350, canvas.width - 900, 50))                   //Wall Horizontal 3


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




    const chainsaw = []

    chainsaw.push(new Chainsaw(975, 400, 25, 320))
    chainsaw.push(new Chainsaw(0, canvas.height - 50, canvas.width, 50))



    chainsaw.forEach(chainsaw => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= chainsaw.sides.left && player.position.x <= chainsaw.sides.right && player.position.y + player.height >= chainsaw.sides.top && player.position.y <= chainsaw.sides.bottom) {
            keys.r.pressed = true
            console.log('Dead')
        }

        c.save()
        chainsaw.draw()
        c.restore()
    })




    const finish = []

    finish.push(new Finish(1100, canvas.height - 150))



    finish.forEach(finish => {
        //Check if the player is on the rectangle
        if (player.position.x + player.width >= finish.sides.left && player.position.x <= finish.sides.right && player.position.y + player.height >= finish.sides.top && player.position.y <= finish.sides.bottom) {
            console.log('Finished')
            level = "8"
            keys.r.pressed = true
        }

        c.save()
        finish.draw()
        c.restore()
    })

}




function level8(){

}