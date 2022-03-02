import { Ctx } from "./canvas";
import * as math from "mathjs";

export abstract class Shape {
    constructor(pos: math.Matrix, color: string, alpha: number, border_color: string, line_width: number) {
        this.m_pos = pos;
        this.m_color = color;
        this.m_alpha = alpha;
        this.m_border_color = border_color;
        this.m_line_width = line_width;
    }

    public abstract draw(ctx: Ctx): void;

    set_pos(pos: math.Matrix): void { this.m_pos = pos; }
    set_color(color: string): void { this.m_color = color; }
    set_alpha(alpha: number): void { this.m_alpha = alpha; }
    set_border_color(border_color: string): void { this.m_border_color = border_color; }
    set_line_width(line_width: number): void { this.m_line_width = line_width; }

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
        radius: number) {

        super(pos, color, alpha, border_color, line_width);
        this.m_radius = radius;
    }

    public set_radius(radius: number) { this.m_radius = radius; }

    public draw(ctx: Ctx): void {
        ctx.beginPath();
        ctx.arc(this.m_pos.get([0]), this.m_pos.get([1]), this.m_radius, 0, Math.PI * 2);

        this.draw_path(ctx);
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
        size: math.Matrix) {

        super(pos, color, alpha, border_color, line_width);
        this.m_size = size;
    }

    public set_size(size: math.Matrix) { this.m_size = size; }

    public draw(ctx: Ctx): void {
        ctx.fillRect(this.m_pos.get([0]), this.m_pos.get([1]), this.m_size.get([0]), this.m_size.get([1]));

        this.draw_path(ctx);
    }

    private m_size: math.Matrix;
}

// infinite length by default
export class Ray extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        line_width: number,
        inclination: math.Matrix,
        length: number = 10000000) {

        super(pos, color, alpha, border_color, line_width);
        this.m_inclination = math.multiply(inclination, length / (math.norm(inclination) as number));
        this.m_end = math.add(this.m_pos, this.m_inclination) as math.Matrix;
    }

    public draw(ctx: Ctx): void {
        ctx.beginPath();
        ctx.moveTo(this.m_pos.get([0]), this.m_pos.get([1]));
        ctx.lineTo(this.m_end.get([0]), this.m_end.get([1]));

        this.draw_path(ctx);
    }

    m_inclination: math.Matrix;
    m_end: math.Matrix;
}
