import {Ray, Circle} from "../engine/shapes";
import {Renderer} from "../engine/renderer";
import * as math from "mathjs";

// control player
export class Player {
    private m_renderer: Renderer;

    private m_pos: math.Matrix;
    // pixel per frame
    private m_vel: math.Matrix = math.matrix([0, 0]);
    // pixel per frame per frame
    private m_acc: number = 5;

    private m_circle: Circle;
    // for mouse

    // directional vectors
    private m_up: math.Matrix = math.matrix([0, -1]);
    private m_down: math.Matrix = math.matrix([0, 1]);
    private m_right: math.Matrix = math.matrix([1, 0]);
    private m_left: math.Matrix = math.matrix([-1, 0]);

    constructor(renderer: Renderer, pos: math.Matrix) {
        this.m_renderer = renderer;
        this.m_pos = pos;
        this.m_circle = new Circle(this.m_pos, "red", 1, "blue", 1, 50);
        this.m_renderer.add_shape(this.m_circle);

        // increase velocity when pressing
        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;
            switch (event.code) {
                case "KeyD":
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_right, this.m_acc)
                    ) as math.Matrix;
                    break;
                case "KeyA": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_left, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
                case "KeyS": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_down, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
                case "KeyW": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_up, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
            }
        });

        document.addEventListener("keyup", (event) => {
            // decrease velocity when releasing
            switch (event.code) {
                case "KeyD":
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_right, this.m_acc)
                    ) as math.Matrix;
                    break;
                case "KeyA": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_left, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
                case "KeyS": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_down, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
                case "KeyW": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_up, this.m_acc)
                    ) as math.Matrix;
                    break;
                }
            }
        });
        // adding ray shooting to the game
        document.addEventListener("click", (e) => {
            m_point_at;
        });
    }

    public update() {
        // TODO: use timings
        this.m_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        this.m_circle.set_pos(this.m_pos);
    }
}
