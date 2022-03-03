import { Ctx } from "./canvas";
import { Shape } from "./shapes";
import * as math from "mathjs";

export class Renderer {
    constructor(canvas_id: string, update_callback: () => void) {
        this.m_ctx = this.setup_canvas(canvas_id);
        // 60fps
        setInterval(() => {
            // TODO: add timing
            update_callback();
            this.render();
        }, 1000 / 60);
    }

    add_mousedown_listener(callback: (pos: math.Matrix) => void) {
        this.m_ctx.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            callback(math.matrix([event.offsetX, event.offsetY]));
        });
    }

    public add_shape(shape: Shape): number {
        let new_key = Math.random();
        while (this.m_shapes.has(new_key))
            new_key = Math.random();
        this.m_shapes.set(new_key, shape);
        return new_key;
    }
    public remove_shape(key: number) {
        this.m_shapes.delete(key);
    }

    private clear_viewport(): void {
        this.m_ctx.clearRect(0, 0, this.m_ctx.canvas.width, this.m_ctx.canvas.height);
    }

    private render(): void {
        this.clear_viewport();
        for (let shape of this.m_shapes)
            shape[1].draw(this.m_ctx);
    }

    private setup_canvas(canvas_id: string): CanvasRenderingContext2D {
        let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        return ctx;
    }

    m_ctx: Ctx;
    m_shapes = new Map<number, Shape>();
}


