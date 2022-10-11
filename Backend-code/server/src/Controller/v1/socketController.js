const chatEventHandler = require("../../Event");
let socketConnect = "";
const sockets = (server) => {
	const io = require("socket.io")(server);
	socketConnect = io;
	io.on("connection", (socket) => {
		socket.on("disconnect", (user_id) => {
			console.log("users leave the room");
			socket.leave(user_id);
		});

		socket.on("ConncetedChat", (user_id) => {
			console.log("join the room");
			socket.join(user_id);
			socket.broadcast.to(user_id).emit("ConncetedChat", user_id);
		});
		socket.on("ConncetedThread", (threadId) => {
			console.log("join the chat room thread", threadId);
			socket.join(threadId);
			socket.broadcast.to(threadId).emit("ConncetedThread", threadId);
		});
		socket.on("typing", (typingInfo) => {
			const { friendId, typing } = typingInfo;
			console.log("typing is listen", typing, friendId);
			socket.in(parseInt(friendId)).emit("typing", typing);
		});
		socket.on("newMessage", (chatInfo) => {
			console.log("join the thread, message", chatInfo);
			socket.broadcast.to(chatInfo.friendId).emit("newMessage", chatInfo);
		});
		socket.on("newMessageTread", (chatInfo) => {
			console.log("message send to thread", chatInfo);
			socket.broadcast.to(chatInfo.threadId).emit("newMessageTread", chatInfo);
		});

		socket.on("leaveChat", (id) => {
			socket.leave(id);
			socket.broadcast.to(id).emit("leaveChat", id);
		});
		socket.on("type", (id, typing) => {
			socket.broadcast.to(id.room_id).emit("type", id, typing);
		});
		socket.on("error", function (err) {
			console.log("received socket error:");
			console.log(err);
		});
	});
};
module.exports = sockets;

chatEventHandler.on("sendMessage", (data) => {
	console.log("listen event", data);
	socketConnect.emit("newMessage", data);
	socketConnect.emit("newMessageTread", data);
});
