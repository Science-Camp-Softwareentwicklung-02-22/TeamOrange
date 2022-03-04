import { Renderer } from "../engine/renderer";
import { Ray } from "../engine/shapes";
import { OtherPlayer } from "./other_player";
import { Player } from "./player";

// TODO: please don't
const INF = 10000000000;

// set player to null when own player is the one shooting
export function shoot(renderer: Renderer, player: Player | null, other_players: Map<string, OtherPlayer>, ray: Ray, shooter: string | null = null) {
    // get length of ray
    let min_distance = INF;

    // set min_distance correctly according to other players
    for (let other_player of other_players) {
        // player can't shoot itself
        if (other_player[0] === shooter)
            continue;

        let other_player_distance = other_player[1].ray_intersect(ray);
        if (other_player_distance != -1 && other_player_distance < min_distance)
            min_distance = other_player_distance;
    }

    if (player) {
        // test if player itself hit
        let player_distance = player.ray_intersect(ray);
        if (player_distance != -1 && player_distance < min_distance) {
            min_distance = player_distance;
            if (min_distance != INF)
                player.kill();
        }
    }


    // render ray
    ray.set_length(min_distance);
    let id = renderer.add_shape(ray);
    // evaporate ray
    setTimeout(() => {
        renderer.remove_shape(id);
    }, 500);
}
