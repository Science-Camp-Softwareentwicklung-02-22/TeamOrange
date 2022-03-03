const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => {
    console.log(`Server open on http://localhost:${PORT}...`);
});

app.use(express.static(path.join(__dirname, "public")));

// redirect incoming messages to all clients
io.on("connection", socket => {
    socket.on("message", msg => {
        console.log(`receiving message: '${msg}'`);
        io.emit("message", msg);
    });
});
