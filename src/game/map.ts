import * as math from "mathjs";
import { Renderer } from "../engine/renderer";

import { Circle } from "../engine/shapes";

export function create_map(renderer: Renderer) {
    let spawn_circle = new Circle(math.matrix([0, 0]), "yellow", 0.5, "orange", 3, 200);
    renderer.add_shape(spawn_circle);
}
