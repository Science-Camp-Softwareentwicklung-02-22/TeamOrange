export type Ctx = CanvasRenderingContext2D;

export function setup_canvas(): CanvasRenderingContext2D {
    let canvas = document.getElementById("play_canvas") as HTMLCanvasElement;
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    return ctx;
}

export function draw_quad(ctx: Ctx): void {
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
}
