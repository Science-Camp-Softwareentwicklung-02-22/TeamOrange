import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";

let g_players: Player[] = [];

let g_renderer = new Renderer("play_canvas", () => {
    for (let player of g_players)
        player.update()
})

g_players.push(new Player(g_renderer, 100, 100));

