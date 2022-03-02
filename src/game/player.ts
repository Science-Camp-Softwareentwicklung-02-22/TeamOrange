// control player
import {Circle, Rectangle} from "../engine/shapes";
import {Renderer} from "../engine/renderer";
import { Matrix, matrix } from "mathjs";

// g_shapes.push(new Circle(ctx, 150, 50, "red", 1, "blue", 100));

export class Player {
    private m_circle: Circle;
    private m_x: number;
    private m_y: number;
    private m_renderer: Renderer;
    private m_speed: number = 1;

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
                //Vectors needed 
                this.m_x.get([1])
                this.m_pos.get([0])
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "a") {
                this.m_x -= this.m_speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "s") {
                this.m_y += this.m_speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
            if (event.key === "w") {
                this.m_y -= this.m_speed;
                this.m_circle.set_location(this.m_x, this.m_y);
            }
        });
        document.addEventListener("keyup" , (event) => {
            if (event.key === "d"){


            }
        }
    }
}
