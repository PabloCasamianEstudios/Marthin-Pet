import k from "./kaplayCtx.js";
import "./assets.js";
import game from "./scenes/game.js";
import fallingFoodGame from "./scenes/fallingFoodGame.js";

k.scene("game", game);
k.scene("fallingFoodGame", fallingFoodGame);

// variable global
if (!k.state.petMoney) k.state.petMoney = 0;

k.go("game");
