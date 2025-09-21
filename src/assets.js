import k from "./kaplayCtx.js";

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
            loop: true,
        },
        sad: {
            from: 5,
            to: 9,
            speed: 14,
            loop: true,
        },
        angry: {
            from: 10,
            to: 14,
            speed: 14,
            loop: true,
        },
        bored: {
            from: 15,
            to: 19,
            speed: 314,
            loop: true,
        },
    },
});

k.loadSprite("heart", "graphics/heart.png", {
    sliceX: 2,
    sliceY: 1,
    anims: {
        live: {
            from: 0,
            to: 0,
            speed: 8,
            loop: true,
        },
        dead: {
            from: 1,
            to: 1,
            speed: 1,
        },
    },
});

k.loadSprite("waffle", "graphics/waffle.png");
k.loadSprite("poop", "graphics/poop.png");

k.loadSprite("bolt", "graphics/bolt.png");
k.loadSprite("coin", "graphics/coin.png");
k.loadSprite("hungry", "graphics/hungry.png");
k.loadSprite("white-heart", "graphics/white-heart.png");

// buttons
k.loadSprite("feedButton", "graphics/feedButton.png");
k.loadSprite("feedButtonHover", "graphics/feedButton-hover.png");

k.loadSprite("playButton", "graphics/playButton.png");
k.loadSprite("playButtonHover", "graphics/playButton-hover.png");

k.loadSprite("shopButton", "graphics/shopButton.png");
k.loadSprite("shopButtonHover", "graphics/shopButton-hover.png");
// fonts
k.loadFont("Poppins", "fonts/Poppins-Regular.ttf");
k.loadFont("Poppins-SemiBold", "fonts/Poppins-SemiBold.ttf");
k.loadFont("Poppins-Bold", "fonts/Poppins-Bold.ttf");

// sounds
k.loadSound("feed", "sound/eating.mp3");
k.loadSound("vomiting", "sound/vomiting.mp3");
