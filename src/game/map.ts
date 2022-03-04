import * as math from "mathjs";
import { Renderer } from "../engine/renderer";

import { Circle, Ray } from "../engine/shapes";

const WIDTH = 10000;
const HEIGHT = 10000;
const LINE_SPACING = 500;

export function create_map(renderer: Renderer) {
    // spawn
    let spawn_circle = new Circle(math.matrix([0, 0]), "yellow", 0.5, "orange", 3, 200);
    renderer.add_shape(spawn_circle);

    // horizonal lines
    for (let y = -HEIGHT / 2; y < HEIGHT / 2; y += LINE_SPACING) {
        let ray = new Ray(math.matrix([-WIDTH / 2, y]), "orange", 1, 1, math.matrix([1, 0]), WIDTH);
        renderer.add_shape(ray);
    }
    // vertical lines
    for (let x = -WIDTH / 2; x < WIDTH / 2; x += LINE_SPACING) {
        let ray = new Ray(math.matrix([x, -HEIGHT / 2]), "orange", 1, 1, math.matrix([0, 1]), WIDTH);
        renderer.add_shape(ray);
    }
}
