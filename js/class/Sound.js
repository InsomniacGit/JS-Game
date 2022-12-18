class Sound {
    constructor() {
        
        this.MenuingSound = []

        this.MenuingSound.push(new Howl({
            src: ['../../assets/sounds/BossFightLoop.wav'],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
                console.log('Menuing Sound Loop Finished!');
            }
        }));

        this.MenuingSound.push(new Howl({
            src: ['../../assets/sounds/Level2Loop.wav'],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
                console.log('Menuing Sound Loop Finished!');
            }
        }));

        this.MenuingSound.push(new Howl({
            src: ['../../assets/sounds/LevelLoop.wav'],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
                console.log('Menuing Sound Loop Finished!');
            }
        }));

        this.MenuingSound.push(new Howl({
            src: ['../../assets/sounds/MenuingLoop.wav'],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
                console.log('Menuing Sound Loop Finished!');
            }
        }));

        this.MenuingSound.push(new Howl({
            src: ['../../assets/sounds/stardewValleyLikeLoop.wav'],
            autoplay: false,
            loop: true,
            volume: 0.1,
            onend: function() {
                console.log('Menuing Sound Loop Finished!');
            }
        }));

        // console.log(MenuingSound)


        this.indexSound = Math.floor(Math.random() * 5)
        this.MenuingSound[this.indexSound].autoplay = true;
        this.MenuingSound[this.indexSound].play();


        this.jumpSound = new Howl({
            src: ['../../assets/sounds/jump.mp3'],
            autoplay: true,
            loop: false,
            volume: 0.1,
            onend: function() {
                console.log('Jump sound finished!');
            }
        });


        this.dashSound = new Howl({
            src: ['../../assets/sounds/dash.wav'],
            autoplay: true,
            loop: false,
            volume: 1,
            onend: function() {
                console.log('Dash sound finished!');
            }
        });
    }

    playJumpSound() {
        this.jumpSound.play();
    }

    playDashSound() {
        this.dashSound.play();
    }

    playMenuingSound() {
        this.MenuingSound[this.indexSound].autoplay = true;
        this.MenuingSound[this.indexSound].play();
    }

    stopMenuingSound() {
        this.MenuingSound[this.indexSound].autoplay = false;
        this.MenuingSound[this.indexSound].stop();
    }
}