import { Ctx, setup_canvas } from "./canvas";
import { Shape } from "./shapes";

export let g_shapes: Shape[] = [];

export function render(ctx: Ctx): void {
    for (let shape of g_shapes)
        shape.draw();
}

export function start(update_callback: () => void): Ctx {
    let ctx = setup_canvas();
    // 60fps
    setInterval(() => {
        // TODO: add timing
        update_callback();
        render(ctx);
    }, 1000 / 60);
    return ctx;
}
