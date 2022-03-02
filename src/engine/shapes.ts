import { Ctx } from "./canvas";
import * as math from "mathjs";

export abstract class Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        line_width: number
    ) {
        this.m_pos = pos;
        this.m_color = color;
        this.m_alpha = alpha;
        this.m_border_color = border_color;
        this.m_line_width = line_width;
    }

    set_pos(pos: math.Matrix): void { this.m_pos = pos; }
    set_color(color: string): void { this.m_color = color; }
    set_alpha(alpha: number): void { this.m_alpha = alpha; }
    set_border_color(border_color: string): void { this.m_border_color = border_color; }
    set_line_width(line_width: number): void { this.m_line_width = line_width; }

    public abstract draw(ctx: Ctx): void;

    // return -1 when not hit
    public abstract ray_intersect(ray: Ray): number;

    // helper function
    protected draw_path(ctx: Ctx): void {
        ctx.globalAlpha = this.m_alpha;
        ctx.lineWidth = this.m_line_width;
        if (this.m_color) {
            ctx.fillStyle = this.m_color;
            ctx.fill();
        }
        if (this.m_border_color) {
            ctx.strokeStyle = this.m_border_color;
            ctx.stroke();
        }
    }

    protected m_pos: math.Matrix;
    // "" -> invisible
    protected m_color: string;
    protected m_alpha: number;
    // "" -> no border gets drawn
    protected m_border_color: string;
    protected m_line_width: number;
}

export class Circle extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        line_width: number,
        radius: number
    ) {
        super(pos, color, alpha, border_color, line_width);
        this.m_radius = radius;
    }

    public set_radius(radius: number) {
        this.m_radius = radius;
    }

    public draw(ctx: Ctx): void {
        ctx.beginPath();
        ctx.arc(
            this.m_pos.get([0]),
            this.m_pos.get([1]),
            this.m_radius,
            0,
            Math.PI * 2
        );

        this.draw_path(ctx);
    }

    // approximation
    public ray_intersect(ray: Ray): number {
        let point_to_center = math.subtract(this.m_pos, ray.get_pos()) as math.Matrix;
        // only works because inclination is normalized
        let length = math.dot(ray.get_inclination(), point_to_center);
        let point_to_intersection = math.multiply(ray.get_inclination(), length);
        let diagonal = math.subtract(point_to_center, point_to_intersection) as math.Matrix;
        let distance = math.norm(diagonal);

        // no hit
        if (distance > this.m_radius)
            return -1;
        return length;
    }

    private m_radius: number;
}

export class Rectangle extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        line_width: number,
        size: math.Matrix
    ) {
        super(pos, color, alpha, border_color, line_width);
        this.m_size = size;
    }

    public set_size(size: math.Matrix) {
        this.m_size = size;
    }

    public draw(ctx: Ctx): void {
        ctx.fillRect(
            this.m_pos.get([0]),
            this.m_pos.get([1]),
            this.m_size.get([0]),
            this.m_size.get([1])
        );

        this.draw_path(ctx);
    }

    // TODO: implement
    public ray_intersect(ray: Ray): number {
        return 0;
    }

    private m_size: math.Matrix;
}

// infinite length by default
export class Ray extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        line_width: number,
        inclination: math.Matrix,
        length: number = 10000000) {

        super(pos, "", alpha, color, line_width);
        this.m_inclination = math.multiply(inclination, 1 / (math.norm(inclination) as number));
        this.m_length = length;
    }

    public set_length(length: number): void { this.m_length = length; }
    public set_inclination(inclination: math.Matrix): void {
        this.m_inclination = math.multiply(inclination, 1 / (math.norm(inclination) as number));
    }

    public point_at(target: math.Matrix): void {
        let inclination = math.subtract(target, this.m_pos) as math.Matrix;
        this.m_inclination = math.multiply(inclination, 1 / (math.norm(inclination) as number));
    }

    // TODO: unclean because Circle and Rectangle don't have this
    public get_pos(): math.Matrix { return this.m_pos; }
    public get_inclination(): math.Matrix { return this.m_inclination; }

    public draw(ctx: Ctx): void {
        ctx.beginPath();
        ctx.moveTo(this.m_pos.get([0]), this.m_pos.get([1]));
        let end = math.add(this.m_pos, math.multiply(this.m_inclination, this.m_length)) as math.Matrix;
        ctx.lineTo(end.get([0]), end.get([1]));

        this.draw_path(ctx);
    }

    // TODO: implement
    public ray_intersect(ray: Ray): number {
        return 0;
    }

    // always normalized
    m_inclination: math.Matrix;
    m_length: number;
}
