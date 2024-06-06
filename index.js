const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();  // Initialize the express application
const server = http.createServer(app);

const io = new Server(server);

// Socket connection
io.on('connection', (socket) => {
   socket.on("user-message", (message) => {
       io.emit("message", message);
   });
});

app.use(express.static(path.resolve("./public")));  // Serve static files from the 'public' directory

app.get("/", (req, res) => {
    return res.sendFile(path.resolve("./public/index.html"));  // Use absolute path
});

server.listen(9000, () => console.log(`Server started at PORT: 9000`));  // Start the server
