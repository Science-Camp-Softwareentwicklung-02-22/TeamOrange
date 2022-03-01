import { g_shapes, start } from "./engine/engine";
import { Shape, Circle, Rectangle } from "./engine/shapes";

// g_shapes.push(new Circle(ctx, 150, 50, "red", 1, "blue", 100));

class Player {
    private m_circle: Circle;
    private m_x: number;
    private m_y: number;

    constructor(x: number, y: number) {
        this.m_circle = new Circle(x, y, "red", 1, "blue", 100);
        this.m_x = x;
        this.m_y = y;
        g_shapes.push(this.m_circle);
    }

    public move() {
        this.m_x += 0.1;
        this.m_circle.set_location(this.m_x, this.m_y);
    }
}

let p = new Player(100, 100);

let ctx = start(() => {
    p.move();
});
