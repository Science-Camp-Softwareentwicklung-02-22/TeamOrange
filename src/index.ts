import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { Ray } from "./engine/shapes";
import * as math from "mathjs"

let g_players: Player[] = [];

let g_renderer = new Renderer("play_canvas", () => {
    for (let player of g_players)
        player.update()
})

g_players.push(new Player(g_renderer, math.matrix([150, 50])));

let r = new Ray(math.matrix([50, 50]), "red", 1, "blue", math.matrix([0, 1]));

