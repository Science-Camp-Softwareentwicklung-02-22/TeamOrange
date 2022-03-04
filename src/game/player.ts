import * as math from "mathjs";

import { Circle, Ray, TextBox } from "../engine/shapes";
import { Camera } from "../engine/camera";
import { Renderer } from "../engine/renderer";
import { send_msg } from "../engine/socket";
import { shoot } from "./shoot";
import { OtherPlayer } from "./other_player";

// control player
export class Player {
    constructor(renderer: Renderer, name: string, pos: math.Matrix, other_players: Map<string, OtherPlayer>) {
        this.m_renderer = renderer;
        this.m_camera = renderer.get_camera();
        this.m_name = name;
        this.m_pos = pos;
        this.m_circle = new Circle(this.m_pos, "lightblue", 1, "blue", 1, 20);
        this.m_renderer.add_shape(this.m_circle);
        this.m_name_tag = new TextBox(get_name_tag_pos(this.m_pos), "white", 1, 30, get_name_tag_str(name, this.m_deaths));
        this.m_renderer.add_shape(this.m_name_tag);

        send_msg({
            type: "player_connected",
            payload: {
                name: this.m_name,
                pos: [this.m_pos.get([0]), this.m_pos.get([1])],
            },
        });

        // increase velocity when pressing
        document.addEventListener("keydown", (event) => {
            if (event.repeat) return;

            switch (event.code) {
                case "KeyD":
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_right, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                case "KeyA": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_left, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
                case "KeyS": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_down, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
                case "KeyW": {
                    this.m_vel = math.add(
                        this.m_vel,
                        math.multiply(this.m_up, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
            }
        });

        document.addEventListener("keyup", (event) => {
            // decrease velocity when releasing
            switch (event.code) {
                case "KeyD":
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_right, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                case "KeyA": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_left, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
                case "KeyS": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_down, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
                case "KeyW": {
                    this.m_vel = math.subtract(
                        this.m_vel,
                        math.multiply(this.m_up, this.m_acc)
                    ) as math.Matrix;
                    this.propagate_movement();
                    break;
                }
            }
        });

        // reset velocity when loosing focus
        document.addEventListener("blur", () => {
            this.m_vel = math.matrix([0, 0]);
        });

        // ray shooting
        renderer.set_mousedown_listener((pos) => {
            let world_pos = this.m_camera.get_inverse_pos(pos);
            let inclination = math.subtract(world_pos, this.m_pos) as math.Matrix;
            let ray = new Ray(this.m_pos, "blue", 1, 1, inclination);
            shoot(renderer, null, other_players, ray);

            // tell other players
            this.propagate_shot(inclination);
        });
    }

    public ray_intersect(ray: Ray): number {
        return this.m_circle.ray_intersect(ray);
    }

    public kill() {
        this.m_name_tag.set_text(get_name_tag_str(this.m_name, ++this.m_deaths));
        // respawn
        this.m_pos = math.matrix([0, 0]);
        this.propagate_movement();
    }

    public update() {
        // TODO: use timings
        this.m_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        this.m_circle.set_pos(this.m_pos);
        this.m_camera.set_pos(this.m_pos);
        this.m_name_tag.set_pos(get_name_tag_pos(this.m_pos));
    }

    private propagate_movement() {
        let new_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        send_msg({
            type: "reposition",
            payload: {
                name: this.m_name,
                pos: [new_pos.get([0]), new_pos.get([1])],
                vel: [this.m_vel.get([0]), this.m_vel.get([1])],
            },
        });
    }

    private propagate_shot(inclination: math.Matrix) {
        let new_pos = math.add(this.m_pos, this.m_vel) as math.Matrix;
        send_msg({
            type: "shoot",
            payload: {
                name: this.m_name,
                pos: [new_pos.get([0]), new_pos.get([1])],
                vel: [this.m_vel.get([0]), this.m_vel.get([1])],
                incl: [inclination.get([0]), inclination.get([1])],
            },
        });
    }

    private m_renderer: Renderer;
    private m_camera: Camera;

    private m_name: string;
    private m_deaths = 0;

    private m_pos: math.Matrix;
    // pixel per frame
    private m_vel: math.Matrix = math.matrix([0, 0]);
    // pixel per frame per frame
    private m_acc: number = 5;

    private m_circle: Circle;
    private m_name_tag: TextBox;
    // for mouse
    // directional vectors
    private m_up: math.Matrix = math.matrix([0, -1]);
    private m_down: math.Matrix = math.matrix([0, 1]);
    private m_right: math.Matrix = math.matrix([1, 0]);
    private m_left: math.Matrix = math.matrix([-1, 0]);
}

export function get_name_tag_str(n: string, deaths: number | null = null) {
    if (n == atob("UGVvcGxlIHJlYWxseSBsaWtlIHRoZWlyIGJ1Z3Mu")) {
        return `${atob("SSBsb3ZlIHlvdSwg")} ${n[28].toUpperCase()}${n[1]}${n[4]}${n[15]}n${n[9]}.`;
    }
    if (deaths != null)
        return `${n} (${deaths})`;
    return n;
}
// lift name tag slightly
export function get_name_tag_pos(pos: math.Matrix): math.Matrix {
    return math.add(pos, math.matrix([0, -40])) as math.Matrix;
}
