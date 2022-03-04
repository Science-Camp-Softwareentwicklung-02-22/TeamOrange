import * as math from "mathjs"

import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { set_on_msg, PlayerConnected, PlayerDisConnected, RepositionMsg, ShootMsg, RawMsg } from "./engine/socket";
import { shoot } from "./game/shoot";
import { OtherPlayer } from "./game/other_player";
import { Ray } from "./engine/shapes";
import { create_map } from "./game/map";

function setup() {
    let player: Player | null = null;
    let other_players = new Map<string, OtherPlayer>();

    let renderer = new Renderer("play_canvas", () => {
        player?.update()

        for (let other_player of other_players) {
            other_player[1].update();
        }
    });
    renderer.set_clear_color("black");
    create_map(renderer);

    set_on_msg(msg => {
        // TODO: remove code duplication
        switch (msg.type) {
            case "reposition": {
                let payload = msg.payload as RepositionMsg;
                // either create new player or adjust existing one
                if (!other_players.has(payload.name)) {
                    other_players.set(payload.name, new OtherPlayer(renderer, payload.name, math.matrix(payload.pos)))
                }
                else {
                    let other_player = other_players.get(payload.name) as OtherPlayer;
                    other_player.set_pos(math.matrix(payload.pos));
                    other_player.set_vel(math.matrix(payload.vel));
                }
                break;
            }
            case "shoot": {
                let payload = msg.payload as ShootMsg;
                if (!other_players.has(payload.name)) {
                    let other_player = new OtherPlayer(renderer, payload.name, math.matrix(payload.pos));
                    other_players.set(payload.name, other_player);
                    let ray = new Ray(other_player.get_pos(), "red", 1, 1, math.matrix(payload.incl));
                    shoot(renderer, player as Player, other_players, ray, payload.name);
                }
                else {
                    let other_player = other_players.get(payload.name) as OtherPlayer;
                    other_players.get(payload.name)?.set_pos(math.matrix(payload.pos));
                    other_players.get(payload.name)?.set_vel(math.matrix(payload.vel));
                    let ray = new Ray(other_player.get_pos(), "red", 1, 1, math.matrix(payload.incl));
                    shoot(renderer, player as Player, other_players, ray, payload.name);
                }
                break;
            }
            case "player_connected": {
                let payload = msg.payload as PlayerConnected;
                // skip already existing players
                if (other_players.has(payload.name))
                    break;
                other_players.set(payload.name, new OtherPlayer(renderer, payload.name, math.matrix(payload.pos)))
                break;
            }
            case "player_disconnected": {
                let payload = msg.payload as PlayerDisConnected;
                other_players.delete(payload.name);
                break;
            }
            // ignore wrong inputs
        }
    })

    player = new Player(renderer, `Chris ${Math.random()}`, math.matrix([0, 0]), other_players);
}

setup();
