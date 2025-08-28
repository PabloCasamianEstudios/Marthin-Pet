import { createPet } from "../entities/pet.js";
import k from "../kaplayCtx.js";

export default function fallingFoodGame() {
    // CONST
    const FOOD_SPEED = 120;
    const BG_PIECE_WIDTH = 1920;
    const INITIAL_LIVES = 4;
    const fallingFood = ["waffle", "poop", "poop", "poop", "poop"];

    // VARS

    let insaneMode = false;
    let lives = INITIAL_LIVES;
    const hearts = [];
    let elapsedTime = 0;
    let score = 0;

    // personaje
    const marthin = createPet(k.vec2(540, 940));
    marthin.z = 5;
    const target = marthin.scale.scale(0.3);
    marthin.scale = marthin.scale.lerp(target, 1);

    // fondo
    const bgPieces = [
        k.add([k.sprite("room-background"), k.scale(8.6), k.pos(0, -10)]),
        k.add([
            k.sprite("room-background"),
            k.scale(8.6),
            k.pos(BG_PIECE_WIDTH * 8.6, -10),
        ]),
    ];

    // objs
    for (let obj of fallingFood) {
        k.sprite(obj);
    }

    //* Events *//

    k.onUpdate(() => {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + BG_PIECE_WIDTH * 8.6, 0);
            bgPieces.push(bgPieces.shift());
        }
        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + BG_PIECE_WIDTH * 8.6, 0);

        if (insaneMode) {
            const t = k.time() * 10;
            const r = k.wave(127, 255, t);
            const g = k.wave(127, 255, t + 1);
            const b = k.wave(127, 255, t + 2);

            bgPieces[0].color = k.rgb(r, g, b);
            bgPieces[0].opacity = 1;

            bgPieces[1].color = k.rgb(r, g, b);
            bgPieces[1].opacity = 1;
        }

        if (k.mousePos().x > 0 && k.mousePos().x < k.width()) {
            marthin.pos.x = k.mousePos().x;
        }

        elapsedTime += k.dt();
    });

    k.onKeyPress("up", () => {
        insaneMode = true;
    });

    k.onKeyRelease("up", () => {
        insaneMode = false;
    });

    k.onUpdate("flyingObj", (t) => {
        t.move(0, t.speed * (insaneMode ? 5 : 1));
        if (t.pos.y - t.height > k.height()) {
            k.destroy(t);
        }
    });

    marthin.onCollide("flyingObj", (obj) => {
        if (obj.sprite === "waffle") {
            k.shake(12);
            k.play("feed");
            score += 1;
            k.destroy(obj);
        }

        if (obj.sprite === "poop") {
            k.shake(120);
            k.play("vomiting");
            takeDamage();
            k.destroy(obj);
        }
    });

    //* funciones *//

    function setupGame() {
        drawHearts();
        spawnFood();
    }

    function drawHearts() {
        const margin = 50;
        for (let i = 0; i < lives; i++) {
            const heart = k.add([
                k.sprite("heart"),
                k.pos(margin + i * 80, margin),
                k.scale(4),
                k.fixed(),
            ]);
            hearts.push(heart);
        }
    }

    function spawnFood() {
        const name = k.choose(fallingFood);

        const speedBase = FOOD_SPEED + elapsedTime * 5;

        k.add([
            k.sprite(name),
            k.area(),
            k.scale(2.5),
            k.pos(k.rand(0, k.width()), 0),
            k.anchor("bot"),
            k.offscreen({ destroy: true }),
            "flyingObj",
            { speed: k.rand(speedBase * 0.5, speedBase * 1.2) },
        ]);

        const baseDelay = insaneMode ? 0.2 : 0.5;
        const progressiveDelay = Math.max(0.1, baseDelay - elapsedTime * 0.005);

        k.wait(progressiveDelay, spawnFood);
    }

    function takeDamage() {
        if (lives > 0) {
            lives -= 1;
            const heart = hearts[lives];
            heart.play("dead");
        }
        if (lives <= 0) {
            console.log("GAME OVER");
            k.state.petMoney += score;
            k.go("game");
        }
    }

    setupGame();
}
