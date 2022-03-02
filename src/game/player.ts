// control player
import {g_shapes, start} from "../engine/engine";
import {Shape, Circle, Rectangle} from "../engine/shapes";

// g_shapes.push(new Circle(ctx, 150, 50, "red", 1, "blue", 100));
const speed = "0";

export class Player {
    private m_circle: Circle;
    private m_x: number;
    private m_y: number;

    constructor(x: number, y: number) {
        this.m_circle = new Circle(x, y, "red", 1, "blue", 100);
        this.m_x = 0;
        this.m_y = 0;
        g_shapes.push(this.m_circle);
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
