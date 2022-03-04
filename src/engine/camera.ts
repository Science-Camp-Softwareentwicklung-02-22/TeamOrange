import * as math from "mathjs";

// TODO: use ctx.save, ctx.translate and ctx.restore instead
export class Camera {
    constructor(dimensions: math.Matrix) {
        this.m_dimensions = dimensions;
        this.m_half_diagonal = math.multiply(this.m_dimensions, 0.5);
        this.m_pos = math.multiply(this.m_half_diagonal, -1);
    }

    public set_pos(center: math.Matrix): void {
        this.m_pos = math.subtract(center, this.m_half_diagonal) as math.Matrix;
    }

    // position in world to position in viewport
    public get_translated_pos(pos: math.Matrix): math.Matrix {
        return math.subtract(pos, this.m_pos) as math.Matrix;
    }
    // position in viewport to position in world
    public get_inverse_pos(pos: math.Matrix): math.Matrix {
        return math.add(pos, this.m_pos) as math.Matrix;
    }
    public get_translated_destructed_pos(pos: math.Matrix): [number, number] {
        let new_pos = this.get_translated_pos(pos);
        return [new_pos.get([0]), new_pos.get([1])];
    }

    private m_pos: math.Matrix;
    private m_dimensions: math.Matrix;
    private m_half_diagonal: math.Matrix;
}
