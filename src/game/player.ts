// control player
import {Circle, Rectangle} from "../engine/shapes";
import {Renderer} from "../engine/renderer";

// g_shapes.push(new Circle(ctx, 150, 50, "red", 1, "blue", 100));
const speed = "0";

export class Player {
    private m_circle: Circle;
    private m_x: number;
    private m_y: number;
    private m_renderer: Renderer;

    constructor(renderer: Renderer, x: number, y: number) {
        this.m_circle = new Circle(x, y, "red", 1, "blue", 100);
        this.m_x = x;
        this.m_y = y;
        this.m_renderer = renderer;
        this.m_renderer.add_shape(this.m_circle);
    }
    public update() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "d") {
                this.m_x = 0.1 + +speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "a") {
                this.m_x = -0.1 + +speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "s") {
                this.m_y = -0.1 + +speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "w") {
                this.m_y = 0.1 + +speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
        });
    }
}
