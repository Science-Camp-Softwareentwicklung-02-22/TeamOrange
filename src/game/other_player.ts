import * as math from "mathjs";

import { Circle, Ray, TextBox } from "../engine/shapes";
import { Renderer } from "../engine/renderer";
import { get_name_tag_pos, get_name_tag_str } from "./player";

// display other player
export class OtherPlayer {
    constructor(renderer: Renderer, name: string, pos: math.Matrix) {
        this.m_renderer = renderer;
        this.m_name = name;
        this.m_pos = pos;
        this.m_circle = new Circle(this.m_pos, "orange", 1, "blue", 1, 20);
        this.m_renderer.add_shape(this.m_circle);
        this.m_name_tag = new TextBox(get_name_tag_pos(this.m_pos), "white", 1, 30, get_name_tag_str(name));
        this.m_renderer.add_shape(this.m_name_tag);
    }

    public set_pos(pos: math.Matrix): void { this.m_pos = pos; }
    public set_vel(vel: math.Matrix): void { this.m_vel = vel; }
    public get_pos(): math.Matrix { return this.m_pos; }

    public ray_intersect(ray: Ray): number {
        return this.m_circle.ray_intersect(ray);
    }

    public update() {
        // TODO: use timings and time stamps
        this.m_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        this.m_circle.set_pos(this.m_pos);
        this.m_name_tag.set_pos(get_name_tag_pos(this.m_pos));
    }

    private m_renderer: Renderer;
    private m_name: string;

    private m_pos: math.Matrix;
    // pixel per frame
    private m_vel: math.Matrix = math.matrix([0, 0]);

    private m_circle: Circle;
    private m_name_tag: TextBox;
}

