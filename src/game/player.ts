// control player

import {Circle, Rectangle} from "../engine/shapes";
import {Renderer} from "../engine/renderer";
import * as math from "mathjs";
import {boolean, e} from "mathjs";

// gucken was passiert wenn knopof gedrückt ist; w
export class Player {
    private m_circle: Circle;
    private m_pos: math.Matrix;
    private m_renderer: Renderer;
    private m_speed: number = 1;
    private m_vel: number = 0.98;

    private m_up: math.Matrix = math.matrix([0, -1]);
    private m_down: math.Matrix = math.matrix([0, 1]);
    private m_right: math.Matrix = math.matrix([1, 0]);
    private m_left: math.Matrix = math.matrix([-1, 0]);

    constructor(renderer: Renderer, pos: math.Matrix) {
        this.m_pos = pos;
        this.m_circle = new Circle(this.m_pos, "red", 1, "blue", 100);
        this.m_renderer = renderer;
        this.m_renderer.add_shape(this.m_circle);
    }
    public update() {
        document.addEventListener("keydown", (event) => {
            if (event.key === "d") {
                this.m_pos = math.add(
                    this.m_pos,
                    math.multiply(this.m_right, this.m_speed)
                ) as math.Matrix;
                this.m_circle.set_pos(this.m_pos);
            }
            // schräg laufen muss noch eingebaut werden
            if (event.key === "a") {
                this.m_pos = math.add(
                    this.m_pos,
                    math.multiply(this.m_left, this.m_speed)
                ) as math.Matrix;
                this.m_circle.set_pos(this.m_pos);
            }
            if (event.key === "s") {
                this.m_pos = math.add(
                    this.m_pos,
                    math.multiply(this.m_down, this.m_speed)
                ) as math.Matrix;
                this.m_circle.set_pos(this.m_pos);
            }
            if (event.key === "w") {
                this.m_pos = math.add(
                    this.m_pos,
                    math.multiply(this.m_up, this.m_speed)
                ) as math.Matrix;
                this.m_circle.set_pos(this.m_pos);
            }
        });
        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "w":
                    this.m_pos = math.multiply(
                        this.m_pos,
                        this.m_vel
                    ) as math.Matrix;
                    break;
                case "a":
                    this.m_pos = math.multiply(
                        this.m_pos,
                        this.m_vel
                    ) as math.Matrix;
                    break;
                case "s":
                    this.m_pos = math.multiply(
                        this.m_pos,
                        this.m_vel
                    ) as math.Matrix;
                    break;
                case "d":
                    this.m_pos = math.multiply(
                        this.m_pos,
                        this.m_vel
                    ) as math.Matrix;
                    break;
            }
        });
    }
}
