import * as socketio from "socket.io-client";

export let g_socket = socketio.io();

// type "reposition"
export type RepositionMsg = {
    name: string;
    pos: [number, number];
    vel: [number, number];
};

// type "shoot"
export type ShootMsg = {
    name: string;
    pos: [number, number];
    vel: [number, number];
}

// type "player_connected"
export type PlayerConnected = {
    name: string;
    pos: [number, number];
}

// type "player_disconnected"
export type PlayerDisConnected = {
    name: string;
}

export type RawMsg = {
    type: string;
    payload: RepositionMsg | ShootMsg | PlayerConnected | PlayerDisConnected;
}

export function send_msg(msg: RawMsg) {
    g_socket.emit("message", JSON.stringify(msg));
}

export function set_on_msg(callback: (msg: RawMsg) => void) {
    g_socket.on("message", msg => {
        callback(JSON.parse(msg));
    });
}

