require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4444;
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const cors = require("cors");
const { savemessage } = require("./controllers/messageController");
const {
  setonline,
  setoffline,
  kickmember,
  makemember,
  makeadmin,
  makeowner,
} = require("./controllers/memberController");
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });
module.exports = io;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", require("./routers/auth"));
app.use("/api/groups", require("./routers/groups"));
app.use("/api/userprofile", require("./routers/userprofile"));
app.use("/api/member", require("./routers/member"));

io.on("connection", async (socket) => {
  socket.join(socket.handshake.headers["groupid"]);
  setonline(
    Number(socket.handshake.headers["userid"]),
    socket.handshake.headers["groupid"],
    io
  );

  socket.on("sendmessage", async (data) => {
    console.log(data);
    let s = await savemessage(data);

    io.to(data.groupid).emit("message", s);
  });

  socket.on("kickamember", async (data) => {
    kickmember(data, io);
  });

  socket.on("makemember", async (data) => {
    console.log("calling making a member here");
    makemember(data, io);
  });

  socket.on("makeadmin", async (data) => {
    console.log("calling making a admin here");
    makeadmin(data, io);
  });

  socket.on("makeowner", async (data) => {
    console.log("calling making a admin here");
    makeowner(data, io);
  });

  socket.on("setoffline", async (data) => {
    setoffline(
      Number(socket.handshake.headers["userid"]),
      socket.handshake.headers["groupid"],
      io
    );
  });

  socket.on("disconnect", async () => {
    console.log("some is disconnected");
  });
});

server.listen(PORT, () => {
  console.log("http://localhost:" + PORT);
});
