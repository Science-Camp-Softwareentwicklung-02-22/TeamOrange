import {Ctx} from "./canvas";
import * as math from "math.js";

export abstract class Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string
    ) {
        this.m_pos = pos;
        this.m_color = color;
        this.m_alpha = alpha;
        this.m_border_color = border_color;
    }

    abstract draw(ctx: Ctx): void;

    set_color(color: string): void {
        this.m_color = color;
    }
    set_border_color(border_color: string): void {
        this.m_border_color = border_color;
    }
    set_alpha(alpha: number): void {
        this.m_alpha = alpha;
    }
    set_pos(pos: math.Matrix): void {
        this.m_pos = pos;
    }

    protected m_pos: math.Matrix;
    // "" -> invisible
    protected m_color: string;
    protected m_alpha: number;
    // "" -> no border gets drawn
    protected m_border_color: string;
}

export class Circle extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        radius: number
    ) {
        super(pos, color, alpha, border_color);
        this.m_radius = radius;
    }

    draw(ctx: Ctx): void {
        // set path
        ctx.beginPath();
        ctx.arc(
            this.m_pos.get([0]),
            this.m_pos.get([1]),
            this.m_radius,
            0,
            Math.PI * 2
        );

        // draw path
        ctx.globalAlpha = this.m_alpha;
        if (this.m_color) {
            ctx.fillStyle = this.m_color;
            ctx.fill();
        }
        if (this.m_border_color) {
            ctx.strokeStyle = this.m_border_color;
            ctx.stroke();
        }
    }

    private m_radius: number;
}

export class Rectangle extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        width: number,
        height: number
    ) {
        super(pos, color, alpha, border_color);
        this.m_width = width;
        this.m_height = height;
    }

    draw(ctx: Ctx): void {
        // set path
        ctx.fillRect(
            this.m_pos.get([0]),
            this.m_pos.get([1]),
            this.m_width,
            this.m_height
        );

        // draw path
        ctx.globalAlpha = this.m_alpha;
        if (this.m_color) {
            ctx.fillStyle = this.m_color;
            ctx.fill();
        }
        if (this.m_border_color) {
            ctx.strokeStyle = this.m_border_color;
            ctx.stroke();
        }
    }

    private m_width: number;
    private m_height: number;
}

export class Ray extends Shape {
    constructor(
        pos: math.Matrix,
        color: string,
        alpha: number,
        border_color: string,
        inclination: math.Matrix
    ) {
        super(pos, color, alpha, border_color);
        this.m_inclination = inclination;
    }

    draw(ctx: Ctx): void {}

    m_inclination: math.Matrix;
}
