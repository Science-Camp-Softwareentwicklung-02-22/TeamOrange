import { Ctx } from "./canvas";
import { Shape } from "./shapes";

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

    // TODO: add remove shape method
    public add_shape(shape: Shape) {
        this.m_shapes.push(shape);
    }

    private clear_viewport(): void {
        this.m_ctx.clearRect(0, 0, this.m_ctx.canvas.width, this.m_ctx.canvas.height);
    }

    private render(): void {
        this.clear_viewport();
        for (let shape of this.m_shapes)
            shape.draw(this.m_ctx);
    }

    private setup_canvas(canvas_id: string): CanvasRenderingContext2D {
        let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        return ctx;
    }

    m_ctx: Ctx;
    m_shapes: Shape[] = [];
}


