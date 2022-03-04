import { OtherPlayer } from "./other_player";
import { Player } from "./player";

export function shoot(player: Player, other_players: Map<string, OtherPlayer>) {

    let ray = new Ray(this.m_pos, "red", 1, 1, inclination);
    let id = this.m_renderer.add_shape(ray);
    // evaporate ray
    setTimeout(() => {
        this.m_renderer.remove_shape(id);
    }, 500);

    let world_pos = this.m_camera.get_inverse_pos(pos);
    let inclination = math.subtract(world_pos, this.m_pos) as math.Matrix;
    let ray = new Ray(this.m_pos, "blue", 1, 1, inclination);
    let id = this.m_renderer.add_shape(ray);

    // evaporate ray
    setTimeout(() => {
        this.m_renderer.remove_shape(id);
    }, 500);

    // tell other players
    this.propagate_shot(inclination);
}
