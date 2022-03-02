import {g_shapes, start} from "./engine/engine";
import {Shape, Circle, Rectangle} from "./engine/shapes";

// g_shapes.push(new Circle(ctx, 150, 50, "red", 1, "blue", 100));
import {Player} from "./game/player";
let p = new Player(100, 100);

start(() => {
    p.update();
});
