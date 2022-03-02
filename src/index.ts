import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { Ray } from "./engine/shapes";
import * as math from "mathjs"

let g_players: Player[] = [];

let r = new Ray(math.matrix([50, 50]), "red", 1, "green", 1, math.matrix([0, 1]));
r.set_line_width(5);

let g_renderer = new Renderer("play_canvas", () => {
    for (let player of g_players)
        player.update()
})

// g_players.push(new Player(g_renderer, math.matrix([150, 50])));

g_renderer.add_shape(r);

