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
var level = "0"

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
        if(level === "3" || level === "4Dash" || level === "4"){
            player.position.x = 100
            player.position.y = 500
        }
        else if(level === "0" || level === "0Dash" || level === "0Key" || level === "0DashKey"){
            player.position.x = 20
            player.position.y = 500
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

        if(level == "0"){
            level = "0DashKey"
            level0DashKey()
        }
        else if(level == "0Dash"){
            level = "0DashKey"
            level0DashKey()
        }
        else if(level == "0Key"){
            level = "0DashKey"
            level0DashKey()
        }
        else if(level == "1"){
            level = "1Dash"
            level1Dash()
        }
        else if(level == "4"){
            level = "4Dash"
            level4Dash()
        }
        else if(level == "7"){
            level = "7DashKey"
            level7DashKey()
        }
        else if(level == "7Dash"){
            level = "7DashKey"
            level7DashKey()
        }
        else if(level == "7Key"){
            level = "7DashKey"
            level7DashKey()
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


    if(level === "0"){
        level0()
    }
    else if(level === "0Dash"){
        level0Dash()
    }
    else if(level === "0Key"){
        level0Key()
    }
    else if(level === "0DashKey"){
        level0DashKey()
    }
    else if(level === "1"){
        level1()
    }
    else if(level === "1Dash"){
        level1Dash()
    }
    else if(level === "2"){
        level2()
    }
    else if(level === '3'){
        level3()
    }
    else if(level === '4'){
        level4()
    }
    else if(level === '4Dash'){
        level4Dash()
    }
    else if(level === '5'){
        level5()
    }
    else if(level === '6'){
        level6()
    }
    else if(level === '7'){
        level7()
    }
    else if(level === '7DashKey'){
        level7DashKey()
    }
    else if(level === '7Key'){
        level7Key()
    }
    else if(level === '7Dash'){
        level7Dash()
    }
    else if(level === '8'){
        level8()
    }
    else if (level === '9'){
        level9()
    }
    else if (level === '10'){
        level10()
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


    //display at the top left of the canvas player.cooldown.dash
    c.save()
    c.font = "20px Arial";
    if(autoRun){
        c.fillText("Autorun activated (e)", 20, 20);
    }
    else{
        c.fillText("Autorun desactivated (e)", 20, 20);
    }
    c.font = "20px Arial";
    if(player.cooldown.dash){
        c.fillText("Dash available (a)", 20, 40);
    }
    c.restore()



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

