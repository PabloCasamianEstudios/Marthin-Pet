import k from './kaplayCtx.js';

// sprites
k.loadSprite("room-background", "graphics/room-background.png");

k.loadSprite("marthin", "graphics/marthin.png", {
    sliceX: 5,
    sliceY: 4,
    anims: {
        happy: {
            from: 0,
            to: 4,
            speed: 14,
            loop: true
        },
        sad: {
            from: 5,
            to: 9,
            speed: 14,
            loop: true
        },
        angry: {
            from: 10,
            to: 14,
            speed: 14,
            loop: true
        },
        bored: {
            from: 15,
            to: 19,
            speed: 314,
            loop: true
        }
       
    }
});

// fonts
k.loadFont("Poppins", "fonts/Poppins-Regular.ttf");
k.loadFont("Poppins-SemiBold", "fonts/Poppins-SemiBold.ttf");
k.loadFont("Poppins-Bold", "fonts/Poppins-Bold.ttf");
