import { createPet } from '../entities/pet.js';
import k from '../kaplayCtx.js';

export default function game() {

    const bgPieceWidth = 1920;
    const bgPieces =[
         k.add([
            k.sprite("room-background"),
            k.scale(8.6),
            k.pos(0,-10)
        ]),
        k.add([
                k.sprite("room-background"),
                k.scale(8.6),
                k.pos(bgPieceWidth * 8.6,-10)
        ]),
    ];

    k.onUpdate(() => {
    if(bgPieces[1].pos.x < 0) {
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
            }
        }
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
            }
        }
    ]);

    const followVal = 0.1;
    marthin.onUpdate(() => {

        if(marthin.getAction() === "idle") {
            marthin.time += k.dt() * 0.5;
            marthin.pos = marthin.pos.lerp(
        k.vec2(
          k.center().x + (k.mousePos().x - k.center().x) * followVal,
          k.center().y + (k.mousePos().y - k.center().y) * followVal
        ),0.04);

            marthin.time += k.dt();
            marthin.pos.y += Math.sin(marthin.time * 4);
    
        }


    });



}