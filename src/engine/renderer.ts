import { Ctx } from "./canvas";
import { Shape } from "./shapes";
import * as math from "mathjs";
import { Camera } from "./camera";

export class Renderer {
    constructor(canvas_id: string, update_callback: () => void) {
        this.m_ctx = this.setup_canvas(canvas_id);
        this.m_dimensions = math.matrix([this.m_ctx.canvas.width, this.m_ctx.canvas.height]);
        this.m_camera = new Camera(this.m_dimensions);
        // 60fps
        setInterval(() => {
            // TODO: add timing
            update_callback();
            this.render();
        }, 1000 / 60);
    }

    public get_dimensions(): math.Matrix { return this.m_dimensions; }
    public get_camera(): Camera { return this.m_camera; }

    public set_clear_color(color: string) { this.m_clear_color = color; }

    public set_mousedown_listener(callback: (pos: math.Matrix) => void): void {
        this.m_ctx.canvas.addEventListener("mousedown", (event: MouseEvent) => {
            callback(math.matrix([event.offsetX, event.offsetY]));
        });
    }
    public set_focus_out_listener(callback: () => void): void {
        this.m_ctx.canvas.addEventListener("focusout", callback);
    }
    public set_key_down_listener(callback: (event: KeyboardEvent) => void): void {
        this.m_ctx.canvas.addEventListener("keydown", callback);
    }
    public set_key_up_listener(callback: (event: KeyboardEvent) => void): void {
        this.m_ctx.canvas.addEventListener("keyup", callback);
    }

    public add_shape(shape: Shape): number {
        let new_id = Math.random();
        while (this.m_shapes.has(new_id))
            new_id = Math.random();
        this.m_shapes.set(new_id, shape);
        return new_id;
    }
    public remove_shape(id: number) {
        this.m_shapes.delete(id);
    }

    private clear_viewport(): void {
        this.m_ctx.clearRect(0, 0, this.m_ctx.canvas.width, this.m_ctx.canvas.height);
        this.m_ctx.globalAlpha = 1;
        this.m_ctx.fillStyle = this.m_clear_color;
        this.m_ctx.fillRect(0, 0, this.m_ctx.canvas.width, this.m_ctx.canvas.height);
    }

    private render(): void {
        this.clear_viewport();
        for (let shape of this.m_shapes)
            shape[1].draw(this.m_ctx, this.m_camera);
    }

    private setup_canvas(canvas_id: string): CanvasRenderingContext2D {
        let canvas = document.getElementById(canvas_id) as HTMLCanvasElement;
        canvas.width = canvas.scrollWidth;
        canvas.height = canvas.scrollHeight;
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        return ctx;
    }

    m_ctx: Ctx;
    m_camera: Camera;
    m_dimensions: math.Matrix;
    m_shapes = new Map<number, Shape>();

    m_clear_color = "white";
}

