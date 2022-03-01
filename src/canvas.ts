export function setup_canvas(): CanvasRenderingContext2D {
    let canvas = document.getElementById("play_canvas") as HTMLCanvasElement;
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    console.log("Hello World!");
    return ctx;
}
