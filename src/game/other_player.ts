import * as math from "mathjs";

import { Circle, Ray } from "../engine/shapes";
import { Renderer } from "../engine/renderer";

// display other player
export class OtherPlayer {
    private m_renderer: Renderer;
    private m_name: string;

    private m_pos: math.Matrix;
    // pixel per frame
    private m_vel: math.Matrix = math.matrix([0, 0]);

    private m_circle: Circle;

    constructor(renderer: Renderer, name: string, pos: math.Matrix) {
        this.m_renderer = renderer;
        this.m_name = name;
        this.m_pos = pos;
        this.m_circle = new Circle(this.m_pos, "orange", 1, "blue", 1, 20);
        this.m_renderer.add_shape(this.m_circle);
    }

    public set_pos(pos: math.Matrix) { this.m_pos = pos; }
    public set_vel(vel: math.Matrix) { this.m_vel = vel; }

    public shoot(inclination: math.Matrix) {
        let ray = new Ray(this.m_pos, "red", 1, 1, inclination);
        let key = this.m_renderer.add_shape(ray);
        // evaporate ray
        setTimeout(() => {
            this.m_renderer.remove_shape(key);
        }, 500);
    }

    public update() {
        // TODO: use timings and time stamps
        this.m_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        this.m_circle.set_pos(this.m_pos);
    }
}

