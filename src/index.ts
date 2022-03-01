import { g_shapes, start } from "./engine/engine";
import { Shape, Circle, Rectangle } from "./engine/shapes";

let ctx = start(() => {
    console.log("run");
});

g_shapes.push(new Circle(ctx, 50, 50, "red", 1, "blue", 10));
