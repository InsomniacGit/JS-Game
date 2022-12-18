// const _WIDTH = document.body.clientWidth;
// const _HEIGHT = document.body.clientHeight;

const _WIDTH = 1280;
const _HEIGHT = 720;

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = _WIDTH
canvas.height = _HEIGHT

var meter = new FPSMeter({ theme: 'light' }); // la docu: https://github.com/darsain/fpsmeter/wiki/Calling
var autoRun = true
var level = "00DashKey"
var select = false

const sound = new Sound()

const player = new Player({
    imageSrc: 'assets/SpritePerso/King/idle1.png', //use King/idle.png for test animation
    frameRate: 11,
})

const keys = {
    z: {
        pressed: false
    },
    q: {
        pressed: false
    },
    d: {
        pressed: false
    },
    r: {
        pressed: false
    },
    Control: {
        pressed: false
    },
    Shift: {
        pressed: false
    },
    Enter: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

keys.r.pressed = true


//MAP INITIALISATION

function animate() {
    meter.tickStart(); // a changer voir la docu en haut
    window.requestAnimationFrame(animate)

    c.save();
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore();

    if(autoRun && keys.Shift.pressed){
        autoRun = false
        keys.Shift.pressed = false
    }
    else if(!autoRun && keys.Shift.pressed){
        autoRun = true
        keys.Shift.pressed = false
    }

    // //Deplacement joueur
    // player.velocity.x = 0
    
    //Sprint when Shift and q or d are pressed

    if ((!keys.d.pressed && !keys.q.pressed) || (keys.d.pressed && keys.q.pressed)){
        PlayerMove (0)
    }
    else if (autoRun && keys.d.pressed){
        PlayerMove (10)
    }
    else if (autoRun && keys.q.pressed){
        PlayerMove (-10)
    }
    else if (!autoRun && keys.d.pressed){
        PlayerMove (5)
    }
    else if (!autoRun && keys.q.pressed){
        PlayerMove (-5)
    }


    //Reset Player Position
    if (keys.r.pressed) {
        player.velocity.x = 0
        player.velocity.y = 0
        if(level === "03" || level === "04Dash" || level === "04"){
            player.position.x = 100
            player.position.y = 500
        }
        else if(level === "00" || level === "00Dash" || level === "00Key" || level === "00DashKey"){
            player.position.x = 20
            player.position.y = 500
        }
        else if(level ==="10" || level === "10Dash"){
            player.position.x = 30
            player.position.y = 30
        }
        else{
            player.position.x = 100
            player.position.y = 100
        }
        player.cooldown.jumping = false
        player.cooldown.dash = false

        sound.stopMenuingSound(sound.indexSound);
        sound.indexSound = Math.floor(Math.random() * 5)        
        sound.playMenuingSound(sound.indexSound);

        if(level == "00"){
            level = "00DashKey"
            level0DashKey()
        }
        else if(level == "00Dash"){
            level = "00DashKey"
            level0DashKey()
        }
        else if(level == "00Key"){
            level = "00DashKey"
            level0DashKey()
        }
        else if(level == "01"){
            level = "01Dash"
            level1Dash()
        }
        else if(level == "04"){
            level = "04Dash"
            level4Dash()
        }
        else if(level == "07"){
            level = "07DashKey"
            level7DashKey()
        }
        else if(level == "07Dash"){
            level = "07DashKey"
            level7DashKey()
        }
        else if(level == "07Key"){
            level = "07DashKey"
            level7DashKey()
        }
        else if(level === "09"){
            level = "09Dash"
            level9Dash()
        }
        else if(level === "10"){
            level = "10Dash"
            level10Dash()
        }

        keys.r.pressed = false
    }




    //Create a function to check if the player is on the ground
    if (player.sides.bottom >= canvas.height) {
        player.cooldown.onGround = true
        player.cooldown.jumping = true
    }

    if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onGround){
        sound.playJumpSound();
        PlayerJump(15)
        player.cooldown.jumping = false
    }


    // console.log((player.position.x + player.width) + " " + (player.position.y + player.height))



    //When the player touch the wall he fall slower
    if (player.sides.left < 0 || player.sides.right > canvas.width) {
        player.velocity.y = 2
    }

    //The player can wall jump if he is on the wall and press z
    if (player.sides.left < 0) {
        player.cooldown.jumping = true
        player.cooldown.onWall = true
        if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onWall){
            
            sound.playJumpSound();
            PlayerSpeedRight(10)
            PlayerJump(10)
            player.cooldown.jumping = false
        }
    }
    else if (player.sides.right > canvas.width) {
        player.cooldown.jumping = true
        player.cooldown.onWall = true
        if (keys.z.pressed && player.cooldown.jumping && player.cooldown.onWall){
            
            sound.playJumpSound();
            PlayerSpeedLeft(10)
            PlayerJump(10)
            player.cooldown.jumping = false
        }
    }


    if(keys.Enter.pressed && select === true){
        select = false
        keys.Enter.pressed = false
        keys.r.pressed = true
    }
    else if(keys.Enter.pressed && select === false){
        select = true
        keys.Enter.pressed = false
    }


    if(select === true){
        // PopUp Menu
        c.save();
        c.fillStyle = 'rgba(0, 0, 0, 0.5)'
        c.fillRect(0, 0, canvas.width, canvas.height)
        c.restore();

        //PopUp Menu Text
        c.save();
        c.fillStyle = 'white'
        c.font = '30px Arial'
        c.textAlign = 'center'
        c.fillText('Press Enter to skip', canvas.width / 2, canvas.height / 2)
        c.fillText('Press Arrow Right to go on the next level', canvas.width / 2, canvas.height / 2 + 50)
        c.fillText('Press Arrow Left to go on the past level', canvas.width / 2, canvas.height / 2 + 100)
        c.restore();

        if(keys.ArrowRight.pressed){
            if(level === "00"){
                level = "01Dash"
                level1Dash()
            }
            else if(level === "00Dash"){
                level = "01Dash"
                level1Dash()
            }
            else if(level === "00Key"){
                level = "01Dash"
                level1Dash()
            }
            else if(level === "00DashKey"){
                level = "01Dash"
                level1Dash()
            }
            else if(level === "01"){
                level = "02"
                level2()
            }
            else if(level === "01Dash"){
                level = "02"
                level2()
            }
            else if(level === "02"){
                level = "03"
                level3()
            }
            else if(level === '03'){
                level = '04Dash'
                level4Dash()
            }
            else if(level === '04'){
                level = '05'
                level5()
            }
            else if(level === '04Dash'){
                level = '05'
                level5()
            }
            else if(level === '05'){
                level = '06'
                level6()
            }
            else if(level === '06'){
                level = '07DashKey'
                level7DashKey()
            }
            else if(level === '07'){
                level = '08'
                level8()
            }
            else if(level === '07DashKey'){
                level = '08'
                level8()
            }
            else if(level === '07Key'){
                level = '08'
                level8()
            }
            else if(level === '07Dash'){
                level = '08'
                level8()
            }
            else if(level === '08'){
                level = '09Dash'
                level9()
            }
            else if (level === '09'){
                level = '10Dash'
                level10()
            }
            else if (level === '09Dash'){
                level = '10Dash'
                level10Dash()
            }
            else if (level === '10'){
                level = '11'
                level11()
            }
            else if (level === '10Dash'){
                level = '11'
                level11()
            }

            keys.ArrowRight.pressed = false
            select = false
            keys.Enter.pressed = false
            keys.r.pressed = true
        }

        if(keys.ArrowLeft.pressed){
            if(level === "01"){
                level = "00Dash"
                level0Dash()
            }
            else if(level === "01Dash"){
                level = "00Dash"
                level0Dash()
            }
            else if(level === "02"){
                level = "01Dash"
                level1Dash()
            }
            else if(level === "03"){
                level = "02"
                level2()
            }
            else if(level === '04'){
                level = '03'
                level3()
            }
            else if(level === '04Dash'){
                level = '03'
                level3()
            }
            else if(level === '05'){
                level = '04Dash'
                level4Dash()
            }
            else if(level === '06'){
                level = '05'
                level5()
            }
            else if(level === '07'){
                level = '06'
                level6()
            }
            else if(level === '07DashKey'){
                level = '06'
                level6()
            }
            else if(level === '07Key'){
                level = '06'
                level6()
            }
            else if(level === '07Dash'){
                level = '06'
                level6()
            }
            else if(level === '08'){
                level = '07DashKey'
                level7DashKey()
            }
            else if (level === '09'){
                level = '08'
                level8()
            }
            else if (level === '09Dash'){
                level = '08'
                level8()
            }
            else if (level === '10'){
                level = '09Dash'
                level9()
            }
            else if (level === '10Dash'){
                level = '09Dash'
                level9()
            }
            else if (level === '11'){
                level = '10Dash'
                level10Dash()
            }

            keys.ArrowLeft.pressed = false
            select = false
            keys.Enter.pressed = false
            keys.r.pressed = true
        }
    }
    else{
        if(level === "00"){
            level0()
        }
        else if(level === "00Dash"){
            level0Dash()
        }
        else if(level === "00Key"){
            level0Key()
        }
        else if(level === "00DashKey"){
            level0DashKey()
        }
        else if(level === "01"){
            level1()
        }
        else if(level === "01Dash"){
            level1Dash()
        }
        else if(level === "02"){
            level2()
        }
        else if(level === '03'){
            level3()
        }
        else if(level === '04'){
            level4()
        }
        else if(level === '04Dash'){
            level4Dash()
        }
        else if(level === '05'){
            level5()
        }
        else if(level === '06'){
            level6()
        }
        else if(level === '07'){
            level7()
        }
        else if(level === '07DashKey'){
            level7DashKey()
        }
        else if(level === '07Key'){
            level7Key()
        }
        else if(level === '07Dash'){
            level7Dash()
        }
        else if(level === '08'){
            level8()
        }
        else if (level === '09'){
            level9()
        }
        else if (level === '09Dash'){
            level9Dash()
        }
        else if (level === '10'){
            level10()
        }
        else if (level === '10Dash'){
            level10Dash()
        }
        else if (level === '11'){
            level11()
        }

    }
    




    //cooldown on key press for doesnt spam dash
    if (keys.Control.pressed && player.cooldown.dash && keys.d.pressed) {
        PlayerSpeedRight(100)
        sound.playDashSound();
        player.cooldown.dash = false
    }else if (keys.Control.pressed && player.cooldown.dash && keys.q.pressed) {
        PlayerSpeedLeft(100)
        sound.playDashSound();
        player.cooldown.dash = false
    }


    c.save()
    c.font = "20px Arial";
    if(autoRun){
        c.fillText("Autorun activated (e)", 20, 40);
    }
    else{
        c.fillText("Autorun desactivated (e)", 20, 40);
    }
    c.font = "20px Arial";
    if(player.cooldown.dash){
        c.fillText("Dash available (a)", 20, 60);
    }
    c.restore()



    c.save()
    c.font = "20px Arial";
    if(level[0] != '0'){
        c.fillText("Level " + level[0] + level[1] + " / 11", 20, 20);
    }
    else{
        c.fillText("Level " + level[1] + " / 11", 20, 20);
    }



    meter.tick(); // a changer voir la docu en haut

    player.cooldown.onGround = false
    player.cooldown.onWall = false


    //platform.draw()

    c.save()
    player.draw()
    player.update()
    c.restore();
}

animate()

