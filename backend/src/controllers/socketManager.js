import { Server, Socket } from "socket.io";



let connections = {}
let messages = {}
let timeOnline = {}

const connectToSocket = (server) => {
    const io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
            }
    });

    io.on("connection", (socket) => {
      console.log(`New connection: ${socket.id}`);

      socket.on("join-call", (path) => {
        if (!connections[path]) {
          connections[path] = [];
        }
        connections[path].push(socket.id);
        timeOnline[socket.id] = new Date();

        // Notify existing users of the new user
        connections[path].forEach((id) => {
          io.to(id).emit("user-joined", socket.id, connections[path]);
        });

        // Send existing messages to the newly joined user
        if (messages[path]) {
          messages[path].forEach((msg) => {
            io.to(socket.id).emit(
              "chat-message",
              msg.data,
              msg.sender,
              msg["socket-id-sender"]
            );
          });
        }
      });

      Socket.on("signal", (told, message) => {
        io.to(toId).emit("signal", Socket.id, message);
      });

      Socket.on("chat-message", (data, sender) => {
        const [ matchingRoom , found] = Object.entries(connections)
        .reduce(([room,isFound],[roomKey,roomValue]) => {
            if(!isFound && roomValue.includes(socket.id)){
                return [roomKey, true];
            }
            return [room, isFound];
        },['',false]);

        if(found == true ){
            if(messages[matchingRoom] == undefined){
                messages[matchingRoom] = [];
            }
            messages[matchingRoom].push({
                'sender': sender,
                'data': data,
                'socket-id-sender': socket.id
            })
            console.log("message",key,":",sender,data);
            connections[matchingRoom].forEach((elem) => {
                io.to(elem).emit("chat-message", data, sender, socket.id);
            })
        }
      });

      Socket.on("disconnect", () => {
        var diffTime = Math.abs(timeOnline[socket.id] - new Date());
        var key;
        for(const [k,v] of JSON.parse(JSON.stringify(Object.entries(connections)))){
            for(let a = 0; a < v.length; ++a){
                if(v[a] == socket.id){
                    key = k;
                    for(let a = 0; a < connections[key].length; ++a ){
                        io.to(connections[key][a].emit('user-left',socket.id))
                    }
                    var index = connections[key].indexOf(socket.id);
                    connections[key].splice(index, 1);
                    if(connections[key].length == 0){
                        delete connections[key];
                    }
                }
            }
        }
      });
    });
    return io;
}

export default connectToSocket;