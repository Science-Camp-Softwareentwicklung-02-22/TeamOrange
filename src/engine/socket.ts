import * as socketio from "socket.io-client";

export let g_socket = socketio.io();

// type = "reposition"
export type RepositionMsg = {
    name: string;
    pos: [number, number];
    vel: [number, number];
};

export type RawMsg = {
    type: string;
    payload: RepositionMsg;
}

