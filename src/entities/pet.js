import k from '../kaplayCtx.js';

export function createPet(pos) {

    const marthin = k.add([
        k.sprite("marthin", {anim: "happy"}),
        k.scale(20),
        k.area(),
        k.anchor("center"),
        k.pos(pos),
        k.body(),
        k.animate(),
        {
            name: "marthin",
            mood: "happy",
            action: "idle",
            time: 0,
            getMood() {
                return this.mood;
            },
            getAction() {
                return this.action;
            },
        },
        // tags
        "pet"
    ])

    return marthin;

}