import { Ctx, setup_canvas } from "./canvas";

export function render(ctx: Ctx): void {

}

export function start(update_callback: () => void): void {
    let ctx = setup_canvas();
    // 60fps
    setInterval(() => {
        update_callback();
        render(ctx);
    }, 1000 / 60);
}
