import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { Ray, Circle } from "./engine/shapes";
import * as math from "mathjs"
let g_players: Player[] = [];

let r = new Ray(math.matrix([50, 50]), "orange", 1, 5, math.matrix([0, 1]));
let c = new Circle(math.matrix([300, 300]), "lightblue", 1, "black", 1, 50);

let g_renderer = new Renderer("play_canvas", () => {
    for (let player of g_players)
        player.update()
    let length = c.ray_intersect(r);
    r.set_length(length == -1 ? 100000 : length);
});
g_renderer.add_mousedown_listener((pos: math.Matrix) => {
    // c.set_pos(pos);
    r.point_at(pos);
});

g_players.push(new Player(g_renderer, "Chris", math.matrix([150, 50])));

g_renderer.add_shape(r);
g_renderer.add_shape(c);
