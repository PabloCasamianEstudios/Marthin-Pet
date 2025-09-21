import { createPet } from "../entities/pet.js";
import k from "../kaplayCtx.js";

export default function game() {
    // const
    const petStats = {
        hunger: Number(sessionStorage.getItem("hunger")) || 100,
        energy: Number(sessionStorage.getItem("energy")) || 100,
        health: Number(sessionStorage.getItem("health")) || 100,
    };
    const baseScale = 20;

    // vars
    let money = k.state.petMoney || 0;

    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("room-background"), k.scale(8.6), k.pos(0, -10)]),
        k.add([
            k.sprite("room-background"),
            k.scale(8.6),
            k.pos(bgPieceWidth * 8.6, -10),
        ]),
    ];

    k.onUpdate(() => {
        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 8.6, 0);

            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 8.6, 0);
    });

    // marthin
    const marthin = createPet(k.vec2(540, 540));

    const nameBubble = k.add([
        k.rect(300, 80, { radius: 20 }),
        k.color(40, 40, 40),
        k.opacity(0.85),
        k.pos(marthin.pos.x, marthin.pos.y - 150),
        k.anchor("center"),
        k.z(10),
        {
            update() {
                this.pos = this.pos.lerp(
                    k.vec2(marthin.pos.x, marthin.pos.y - 300),
                    0.1
                );
            },
        },
    ]);

    const nameText = k.add([
        k.text(`${marthin.name}`, {
            font: "Poppins-SemiBold",
            size: 48,
        }),
        k.anchor("center"),
        k.pos(nameBubble.pos),

        k.color(255, 255, 255),
        k.z(11),
        {
            update() {
                this.pos = nameBubble.pos;

                this.pos.y += Math.sin(k.time() * 2) * 1.5;
            },
        },
    ]);

    const followVal = 0.1;
    marthin.onUpdate(() => {
        if (marthin.getAction() === "idle") {
            marthin.time += k.dt() * 0.5;
            marthin.pos = marthin.pos.lerp(
                k.vec2(
                    k.center().x + (k.mousePos().x - k.center().x) * followVal,
                    k.center().y + (k.mousePos().y - k.center().y) * followVal
                ),
                0.04
            );

            marthin.time += k.dt();
            marthin.pos.y += Math.sin(marthin.time * 4);

            const minFactor = 0.7;

            const factor =
                minFactor + (petStats.hunger / 100) * (1 - minFactor);
            marthin.scale = k.vec2(baseScale * factor, baseScale * factor);
        }
    });

    marthin.onClick(() => {
        if (activeWaffle) {
            k.play("feed");

            petStats.hunger = Math.min(100, petStats.hunger + 20);
            sessionStorage.setItem("hunger", petStats.hunger);

            const target = marthin.scale.scale(1.1);
            marthin.scale = marthin.scale.lerp(target, 0.2);

            activeWaffle.destroy();
            activeWaffle = null;
        }
    });

    const mouth = marthin.add([
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0, -3), 2, 1) }),
        "mouth",
    ]);

    mouth.onCollide("waffle", (w) => {
        k.play("feed");

        petStats.hunger = Math.min(100, petStats.hunger + 20);
        sessionStorage.setItem("hunger", petStats.hunger);

        const target = marthin.scale.scale(1.05);
        marthin.scale = marthin.scale.lerp(target, 0.2);

        w.destroy();
        activeWaffle = null;
    });

    // UI things

    // feed
    const feedButton = k.add([
        k.sprite("feedButton"),
        k.scale(10),
        k.pos(535, 950),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 32, 15) }),
    ]);

    feedButton.onHover(() => {
        feedButton.sprite = "feedButtonHover";
        document.body.style.cursor = "pointer";
        k.setCursor("pointer");
    });

    feedButton.onHoverEnd(() => {
        feedButton.sprite = "feedButton";
        k.setCursor("default");
    });

    let activeWaffle = null;
    feedButton.onClick(() => {
        if (activeWaffle) return;

        activeWaffle = k.add([
            k.sprite("waffle"),
            k.scale(4),
            k.area(),
            k.pos(k.mousePos()),
            k.anchor("center"),
            "waffle",
        ]);

        activeWaffle.onUpdate(() => {
            activeWaffle.pos = k.mousePos();
        });
    });

    // play falling food game

    const playButton = k.add([
        k.sprite("playButton"),
        k.scale(10),
        k.pos(225, 950),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 32, 15) }),
    ]);

    playButton.onHover(() => {
        playButton.sprite = "playButtonHover";
        document.body.style.cursor = "pointer";
        k.setCursor("pointer");
    });

    playButton.onHoverEnd(() => {
        playButton.sprite = "playButton";
        k.setCursor("default");
    });

    playButton.onClick(() => {
        k.state.petMoney = money;
        k.go("fallingFoodGame");
    });

    // shop (not implemented yet)

    const shopButton = k.add([
        k.sprite("shopButton"),
        k.scale(10),
        k.pos(850, 950),
        k.anchor("center"),
        k.area({ shape: new k.Rect(k.vec2(0), 32, 15) }),
    ]);

    shopButton.onHover(() => {
        shopButton.sprite = "shopButtonHover";
        document.body.style.cursor = "pointer";
        k.setCursor("pointer");
    });

    shopButton.onHoverEnd(() => {
        shopButton.sprite = "shopButton";
        k.setCursor("default");
    });

    shopButton.onClick(() => {
        k.state.petMoney = money;
        // k.go("");g
    });

    const hungerBar = createStatBar(
        "Hambre",
        k.rgb(205, 133, 63),
        k.vec2(20, 40),
        () => petStats.hunger
    );
    const energyBar = createStatBar(
        "Energía",
        k.rgb(255, 215, 0),
        k.vec2(20, 100),
        () => petStats.energy
    );
    const healthBar = createStatBar(
        "Salud",
        k.rgb(220, 20, 60),
        k.vec2(20, 160),
        () => petStats.health
    );

    function createStatBar(label, color, pos, getValue) {
        const width = 200;
        const height = 20;

        k.add([
            k.rect(width, height, { radius: 4 }),
            k.color(60, 60, 60),
            k.pos(pos),
            k.anchor("left"),
            k.z(200),
        ]);

        const bar = k.add([
            k.rect(width, height, { radius: 4 }),
            k.color(color),
            k.pos(pos),
            k.anchor("left"),
            k.z(201),
            {
                update() {
                    this.width = (getValue() / 100) * width;
                },
            },
        ]);

        k.add([
            k.text(label, { size: 24, font: "Poppins-SemiBold" }),
            k.pos(pos.x, pos.y - 30),
            k.color(255, 255, 255),
            k.z(202),
        ]);

        return bar;
    }

    k.loop(1, () => {
        petStats.hunger = Math.max(0, petStats.hunger - 0.5);
        petStats.energy = Math.max(0, petStats.energy - 0.2);

        sessionStorage.setItem("hunger", petStats.hunger);
        sessionStorage.setItem("energy", petStats.energy);
        sessionStorage.setItem("health", petStats.health);
    });
}
