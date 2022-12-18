window.addEventListener('keydown', (event) => {
    //console.log(event)
    switch (event.key) {
        case 'z':
            keys.z.pressed = true
            break;
        //Déplacement vers la gauche du joueur
        case 'q':
            keys.q.pressed = true
            break
        //Déplacement vers la droite du joueur
        case 'd':
            keys.d.pressed = true
            break
        //Reset Player Position
        case 'r':
            keys.r.pressed = true //Faire en sorte que ca reset tout le canvas et pas que la position du joueur
            break
        //Dash
        case 'a':
            keys.Control.pressed = true
            break
        case 'e':
            keys.Shift.pressed = true
            break
    }
    console.log(event.key)
})


window.addEventListener('keyup', (event) => {
    //Quand on relache la touche, on stop le déplacement (mis à 0)
    switch (event.key) {
        //Stop Jump
        case 'z':
            keys.z.pressed = false
            break
        //Stop Déplacement vers la gauche du joueur
        case 'q':
            keys.q.pressed = false
            break
        //Stop Déplacement vers la droite du joueur
        case 'd':
            keys.d.pressed = false
            break
        //Dash
        case 'a':
            keys.Control.pressed = false
            break
        case 'e':
            keys.Shift.pressed = false
            break
    }
})


PlayerJump = function(x) {
    player.velocity.y = -x
}
PlayerSpeedLeft = function(x) {
    player.velocity.x = -x
}
PlayerSpeedRight = function(x) {
    player.velocity.x = x
}

PlayerMove = function(x) {
    // console.log(player.velocity.x)
    if(player.velocity.x > x){
        player.velocity.x += -1
    }
    else if(player.velocity.x < x){
        player.velocity.x += 1
    }else{
        player.velocity.x = x
    }
}