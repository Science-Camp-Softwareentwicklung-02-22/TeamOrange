<<<<<<< HEAD
import {Ctx, setup_canvas} from "./canvas";

export function render(ctx: Ctx): void {}
=======
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
>>>>>>> f1e119342ba98f22be467120ea9c69160e76d097

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
