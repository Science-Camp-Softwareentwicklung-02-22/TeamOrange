// control player

import {Circle, Rectangle} from "../engine/shapes";
import {Renderer} from "../engine/renderer";
import * as math from "mathjs";
import {boolean, e} from "mathjs";

// gucken was passiert wenn knopof gedrückt ist; w
export class Player {
    private m_renderer: Renderer;

    private m_pos: math.Matrix;
    private m_vel: math.Matrix;

    private m_circle: Circle;
    private m_acc: number = 100;

    private m_up: math.Matrix = math.matrix([0, -1]);
    private m_down: math.Matrix = math.matrix([0, 1]);
    private m_right: math.Matrix = math.matrix([1, 0]);
    private m_left: math.Matrix = math.matrix([-1, 0]);

    constructor(renderer: Renderer, pos: math.Matrix) {
        this.m_pos = pos;
        this.m_vel = math.matrix([0, 0]);
        this.m_circle = new Circle(this.m_pos, "red", 1, "blue", 1, 100);
        this.m_renderer = renderer;
        this.m_renderer.add_shape(this.m_circle);

        // switch
        // m.pos zu m. vel
        // unterer bereich statt add substrakt
        // update --> m pos zu set pos

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "d":
                    this.m_vel = this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_right, this.m_acc)
                    ) as math.Matrix;
                    this.m_circle.set_pos(this.m_pos);
                    break;
                case "a": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_left, this.m_acc)
                    ) as math.Matrix;
                    this.m_circle.set_pos(this.m_pos);
                    break;
                }
                case "s": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_down, this.m_acc)
                    ) as math.Matrix;
                    this.m_circle.set_pos(this.m_pos);
                    break;
                }
                case "w": {
                    this.m_pos = math.add(
                        this.m_vel,
                        math.multiply(this.m_up, this.m_acc)
                    ) as math.Matrix;
                    this.m_circle.set_pos(this.m_pos);
                    break;
                }
            }
            document.addEventListener("keyup", (event) => {
                switch (event.key) {
                    case "w":
                        this.m_vel = math.subtract(
                            this.m_vel,
                            math.multiply(this.m_up, this.m_acc)
                        ) as math.Matrix;
                        break;
                    case "a":
                        this.m_vel = math.subtract(
                            this.m_vel,
                            math.multiply(this.m_left, this.m_acc)
                        ) as math.Matrix;
                        break;
                    case "s":
                        this.m_vel = math.subtract(
                            this.m_vel,
                            math.multiply(this.m_down, this.m_acc)
                        ) as math.Matrix;
                        break;
                    case "d":
                        this.m_vel = math.subtract(
                            this.m_vel,
                            math.multiply(this.m_right, this.m_acc)
                        ) as math.Matrix;
                        break;
                }
                //Bullets
                //
                //
                //
            });
        });
    }
    public update() {
        this.m_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
    }
}
