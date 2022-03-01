import { Ctx, setup_canvas } from "./canvas";
import { Shape } from "./shapes";

export let g_shapes: Shape[] = [];

export function clear_viewport(ctx: Ctx): void {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

export function render(ctx: Ctx): void {
    clear_viewport(ctx);
    for (let shape of g_shapes)
        shape.draw(ctx);
}

export function start(update_callback: () => void): void {
    let ctx = setup_canvas();
    // 60fps
    setInterval(() => {
        // TODO: add timing
        update_callback();
        render(ctx);
    }, 1000 / 60);
}
