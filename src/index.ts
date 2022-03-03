import * as math from "mathjs"

import { Renderer } from "./engine/renderer";
import { Player } from "./game/player";
import { set_on_msg, PlayerConnected, PlayerDisConnected, RepositionMsg, ShootMsg } from "./engine/socket";
import { OtherPlayer } from "./game/other_player";

function setup() {
    let player: Player | null = null;
    let other_players: Map<string, OtherPlayer> = new Map<string, OtherPlayer>();

    let renderer = new Renderer("play_canvas", () => {
        player?.update()

        for (let other_player of other_players) {
            other_player[1].update();
        }
    });

    set_on_msg(msg => {
        switch (msg.type) {
            case "reposition": {
                let payload = msg.payload as RepositionMsg;
                // either create new player or adjust existing one
                if (!other_players.has(payload.name)) {
                    other_players.set(payload.name, new OtherPlayer(renderer, payload.name, math.matrix(payload.pos)))
                }
                else {
                    other_players.get(payload.name)?.set_pos(math.matrix(payload.pos));
                    other_players.get(payload.name)?.set_vel(math.matrix(payload.vel));
                }
                break;
            }
            case "shoot": {
                let payload = msg.payload as ShootMsg;
                // TODO: implement
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

    player = new Player(renderer, `Chris ${Math.random()}`, math.matrix([150, 50]));
}

setup();
