//controll player

let player = {
    height: 32,
    jumping: true,
    width: 20,
    x: 144,
    x_velocity: 0,
    y_velocity: 0,
};

let controller = {
    left: false,
    right: false,
    up: false,
};

function lauscher(event: KeyboardEvent) {
    const key_state = event.type == "keydown" ? true : false;

    switch (event.code) {
        case "KeyA":
            controller.left = key_state;
            break;
        case "KeyD":
            controller.right = key_state;
            break;
        case "KeyW":
            controller.up = key_state;
            break;
    }
}
function loop() {
    if (controller.up && player.jumping == false) {
        player.y_velocity -= 20;
        player.jumping = true;
    }
    if (controller.left) {
        player.x_velocity -= 0.5;
    }

    if (controller.right) {
        (player.x_velocity += 0), 5;
    }

    player.y_velocity += 1.5;
    player.x_velocity += player.x_velocity;
    player.y_velocity += player.y_velocity;
    player.x_velocity *= 0.9;
    player.y_velocity *= 0.9;

    if (player.x > 320) {
        player.x = -32;
    }

    window.addEventListener("keydown", lauscher);
    window.addEventListener("keyup", lauscher);
    window.requestAnimationFrame(loop);
}
