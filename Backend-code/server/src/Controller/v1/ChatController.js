const ApiController = require("./ApiController");
const app = require("../../../helper/CommanMethod");
const Db = require("../../../helper/sqlBulider");
const ApiError = require("../../Exceptions/ApiError");
const { lang } = require("../../../config");
const chatEventHandler = require("../../Event");
const DB = new Db();
const axios = require("axios");

class ChatController extends ApiController {
	async sendMessage(Request) {
		const FormData = require("form-data");

		var sender_message = Request.body.message;

		var data = new FormData();
		data.append("text", sender_message);
		data.append("lang", "de,en");
		data.append("opt_countries", "us");
		data.append("mode", "standard");
		data.append("api_user", "480638631");
		data.append("api_secret", "Esx6nzXtxPCZ8dWdyUVU");

		console.log(
			"----------------- Sightengine data ----------------------------"
		);
		console.log(data);

		var required;
		var theRequest = Request;

		required = axios({
			url: "https://api.sightengine.com/1.0/text/check.json",
			method: "post",
			data: data,
			headers: data.getHeaders(),
		})
			.then(function (response) {
				if (response.data["profanity"].matches.length > 0) {
					required = {
						friendId: theRequest.body.friendId,
						userId: theRequest.body.userId,
						messageType: theRequest.body.messageType || "0", // 0-> text 1-> media
						message: sender_message + " (YOU RUDE AHOLE!)" || "",
					};
				} else {
					required = {
						friendId: theRequest.body.friendId,
						userId: theRequest.body.userId,
						messageType: theRequest.body.messageType || "0", // 0-> text 1-> media
						message: sender_message || "",
					};
				}

				return required;
				// on success: handle response
				console.log(response.data);
			})
			.catch(function (error) {
				// handle error
				if (error.response) console.log(error.response.data);
				else console.log(error.message);
			});

		if (required.messageType !== "0") delete required.message;
		const requestData = await super.vaildation(required, {});
		const { userId, friendId } = requestData;
		const userInfo = await DB.find("users", "first", {
			conditions: {
				"users.id": friendId,
			},
			fields: ["id", "name", "status", "phone", "profile", "isInvite"],
		});
		if (!userInfo) throw new ApiError(lang[Request.lang].userNotFound, 404);

		const query = `select * from threads where ((userId = ${userId} and friendId = ${friendId}) or (userId = ${friendId} and friendId = ${userId}))  limit 1`;
		const threads = await DB.first(query);
		if (threads.length > 0) {
			requestData.threadId = threads[0].id;
		} else {
			requestData.threadId = await DB.save("threads", requestData);
		}
		if (
			!(Request.files && Request.files.message) &&
			requestData.message_type > "0"
		)
			throw new ApiError("message feild required", 400);
		if (Request.files && Request.files.message) {
			requestData.message = await app.upload_pic_with_await(
				Request.files.message
			);
		}
		requestData.senderId = requestData.userId;
		requestData.receiverId = requestData.friendId;
		requestData.id = await DB.save("chats", requestData);
		const object = {
			id: requestData.threadId,
			lastMessageId: requestData.id,
			lastMessageId1: requestData.id,
			lastMessageId2: requestData.id,
		};
		DB.save("threads", object);
		if (userInfo.profile) {
			userInfo.profile = global.appURL + "uploads/" + userInfo.profile;
		}
		if (requestData.messageType !== "0") {
			requestData.message = global.appURL + "uploads/" + requestData.message;
		}
		requestData.friendInfo = Request.body.userInfo;
		requestData.text = requestData.message;
		chatEventHandler.emit("sendMessage", requestData);
		setTimeout(() => {
			if (userInfo.isInvite === 1) {
				app.sendSMS({
					to: `${Request.body.userInfo.countryCode}${userInfo.phone}`,
					message: `${requestData.message}, ${Request.body.userInfo.name} has sent to you a message. Download the app https://play.google.com/store/games`,
				});
			} else {
				const pushObject = {
					message:
						parseInt(required.messageType) === 0
							? `${requestData.friendInfo.name}: ${requestData.message}`
							: "sent a media file",
					notification_code: 8,
					body: requestData,
				};
				super.sendPush(pushObject, requestData.friendId);
			}
		}, 100);

		return {
			message: lang[Request.lang].messageSend,
			data: requestData,
		};
	}

	async sendMessageByPhone(Request) {
		const required = {
			phone: Request.body.phone,
			userId: Request.body.userId,
			messageType: Request.body.messageType || "0", // 0-> text 1-> media
			message: Request.body.message || "",
		};
		if (required.messageType !== "0") delete required.message;
		const requestData = await super.vaildation(required, {
			name: Request.body.name,
		});
		const { userId, phone } = requestData;
		const phoneCopy = app.removeCountryCode(phone);
		const userInfo = await DB.find("users", "first", {
			conditions: {
				phone: phoneCopy,
			},
			fields: ["id", "name", "status", "phone", "profile", "isInvite"],
		});
		let friendId;
		let isSendMessage = false;
		if (!userInfo) {
			friendId = await DB.save("users", {
				phone: phoneCopy,
				isInvite: 1,
				contactName: Request.body.name || "",
				addBy: Request.body.userId,
			});
			isSendMessage = true;
		} else {
			friendId = userInfo.id;
			if (userInfo.isInvite === 1) {
				isSendMessage = true;
			}
		}
		requestData.friendId = friendId;
		const query = `select * from threads where ((userId = ${userId} and friendId = ${friendId}) or (userId = ${friendId} and friendId = ${userId}))  limit 1`;
		const threads = await DB.first(query);
		if (threads.length > 0) {
			requestData.threadId = threads[0].id;
		} else {
			requestData.threadId = await DB.save("threads", requestData);
		}
		if (
			!(Request.files && Request.files.message) &&
			requestData.messageType > "0"
		)
			throw new ApiError("message feild required", 400);
		if (Request.files && Request.files.message) {
			requestData.message = await app.upload_pic_with_await(
				Request.files.message
			);
		}
		requestData.senderId = requestData.userId;
		requestData.receiverId = requestData.friendId;
		requestData.id = await DB.save("chats", requestData);
		const object = {
			id: requestData.threadId,
			lastMessageId: requestData.id,
			lastMessageId1: requestData.id,
			lastMessageId2: requestData.id,
		};
		DB.save("threads", object);
		if (userInfo && userInfo.profile) {
			userInfo.profile = global.appURL + "uploads/" + userInfo.profile;
		}
		if (requestData.messageType !== "0") {
			requestData.message = global.appURL + "uploads/" + requestData.message;
		}
		requestData.user_info = Request.body.userInfo;
		requestData.text = requestData.message;
		chatEventHandler.emit("sendMessage", requestData);
		setTimeout(() => {
			if (isSendMessage) {
				app.sendSMS({
					to: phone.replace("+", ""),
					message: `${requestData.message}, ${Request.body.userInfo.name} has sent to you a message. Download the app https://play.google.com/store/games`,
				});
			}
			const pushObject = {
				message:
					parseInt(required.messageType) === 0
						? `${requestData.friendInfo.name}: ${requestData.message}`
						: "sent a media file",
				notification_code: 8,
				body: requestData,
			};
			super.sendPush(pushObject, requestData.friendId);
		}, 100);

		return {
			message: "Message sent successfully",
			data: requestData,
		};
	}

	async getMessage(Request) {
		const required = {
			userId: Request.body.userId,
			receiverId: Request.params.receiverId,
		};
		const requestData = await super.vaildation(required, {});
		const { userId, receiverId } = requestData;
		const thread = `select threads.*,threads.id as thread_id from threads where  ((threads.userId = ${userId} and threads.friendId = ${receiverId}) or (threads.userId = ${receiverId} and threads.friendId = ${userId})) limit 1`;
		let id = 0;
		const threadInfo = await DB.first(thread);
		if (threadInfo.length === 0) throw new ApiError("No Chat found", 404);
		if (threadInfo.length > 0) {
			if (threadInfo[0].userId === parseInt(userId)) {
				id = threadInfo[0].firstFriendDeletedId;
			} else {
				id = threadInfo[0].secondFriendDeletedId;
			}
		}
		DB.first(
			`update chats set isRead = 1 where receiverId= ${userId} and threadId = ${threadInfo[0].thread_id}`
		);
		const query = `select chats.*, users.addBy, users.id as friend_id, users.profile, users.name, users.contactName, users.profile, users.isInvite, users.phone from chats join users on (users.id = IF(chats.senderId =
			${userId},chats.receiverId,chats.senderId)) where threadId=${threadInfo[0].thread_id} and chats.id > ${id} and (select count(id) as total from delete_chats where userId =  ${userId} and chatId = chats.id) = 0 order by chats.id desc limit 100`;
		const chats = await DB.first(query);
		const final = makeChatArray(chats);
		return {
			message: lang[Request.lang].messages,
			data: final,
		};
	}

	async endChat({ params: { threadId }, body: { userId, userInfo } }) {
		const { userType } = userInfo;
		if (userType === 1) throw new ApiError("Not found", 404);
		const threadInfo = await DB.find("threads", "first", {
			conditions: {
				id: threadId,
				raw: [`user_id = ${userId} or friend_id = ${userId}`],
			},
		});
		if (!threadInfo) throw new ApiError("Invaild thread info", 404);
		await DB.save("threads", {
			id: threadId,
			isEnd: 1,
		});
		return {
			message: "Chat ended",
			data: {},
		};
	}

	async lastChat({ ln = "en", body: { userId } }) {
		const query = `select users.id as friendId, (select count(id) from chats  where isRead = 0 and receiverId = ${userId} and senderId = users.id) as unReadMessage, users.contactName, users.addBy, users.name, users.profile, users.phone, users.isInvite,
		chats.*
		from threads join chats on (chats.id = IF(userId = ${userId}, lastMessageId1, lastMessageId2 )) join users on (users.id = IF(userId = ${userId}, friendId, userId ))
		where (threads.userId = ${userId} or threads.friendId = ${userId}) and chats.id > IF(threads.userId = ${userId}, threads.firstFriendDeletedId, threads.secondFriendDeletedId)  order by chats.id desc`;
		return {
			message: lang[ln].lastChat,
			data: makeChatArray(await DB.first(query)),
		};
	}

	async readMessage({ body: { userId }, params: { chat_id } }) {
		await DB.first(
			`update chats set isRead = 1 where receiverId = ${userId} and id=${chat_id}`
		);
		return {
			message: "Message read successfully",
			data: [],
		};
	}

	async deleteSingleMessage(req) {
		const required = {
			userId: req.body.userId,
			chatId: req.params.chatId,
		};
		const request_data = await super.vaildation(required, {});
		const checkChatMessage = await DB.find("chats", "first", {
			conditions: {
				id: req.params.chatId,
			},
		});
		if (!checkChatMessage) {
			throw new ApiError("Message not found", 400);
		}
		await DB.save("delete_chats", request_data);
		const checkThread = await DB.find("threads", "first", {
			conditions: {
				id: checkChatMessage.threadId,
			},
		});
		if (checkThread) {
			let id = 0;
			let key = "";
			let userMessageKey = "lastMessageId2";
			if (checkThread.userId === parseInt(req.body.userId)) {
				id = checkThread.firstFriendDeletedId;
				key = "firstFriendDeletedId";
				userMessageKey = "lastMessageId1";
			} else {
				id = checkThread.secondFriendDeletedId;
				key = "secondFriendDeletedId";
				userMessageKey = "lastMessageId2";
			}
			const query = `select chats.*, users.id as friend_id, users.profile, users.name, users.profile, users.isInvite, users.phone from chats join users on (users.id = IF(chats.senderId =
				${req.body.userId},chats.receiverId,chats.senderId)) where threadId=${checkThread.id} and chats.id > ${id} and (select count(id) as total from delete_chats where userId =  ${req.body.userId} and chatId = chats.id) = 0 order by chats.id desc limit 1`;
			const chats = await DB.first(query);

			if (
				parseInt(req.params.chatId) === checkThread[userMessageKey] &&
				chats.length
			) {
				await DB.save("threads", {
					id: checkThread.id,
					[userMessageKey]: chats[0].id,
				});
			}
			if (chats.length === 0) {
				const getLastMessage = await DB.find("chats", "first", {
					conditions: {
						threadId: checkThread.id,
					},
					fields: ["id"],
					limit: 1,
					orderBy: ["id desc"],
				});
				if (getLastMessage) {
					await DB.save("threads", {
						id: checkThread.id,
						[key]: getLastMessage.id,
					});
				}
			}
		}
		return {
			message: lang[req.lang].chatDelete,
			data: [],
			status: 204,
		};
	}

	async deleteChat(Request) {
		const required = {
			userId: Request.body.userId,
			threadId: Request.params.threadId,
		};
		const request_data = await super.vaildation(required, {});
		let query = "select * from threads where id = " + request_data.threadId;
		let last_chats = await DB.first(query);
		if (last_chats.length > 0) {
			if (last_chats[0].userId === request_data.userId) {
				request_data.firstFriendDeletedId = last_chats[0].lastMessageId;
			} else {
				request_data.secondFriendDeletedId = last_chats[0].lastMessageId;
			}
			request_data.id = last_chats[0].id;
			delete request_data.userId;
			delete request_data.threadId;
			await DB.save("threads", request_data);
		} else {
			throw new ApiError(lang[Request.lang].threadInvaild, 404);
		}
		return {
			message: lang[Request.lang].chatDelete,
			data: [],
		};
	}
}

exports.ChatController = new ChatController();

const makeChatArray = (chats) => {
	return chats.map((value) => {
		const chats = {
			id: value.id,
			senderId: value.senderId,
			receiverId: value.receiverId,
			threadId: value.threadId,
			messageType: value.messageType,
			message: value.message,
			isRead: value.isRead,
			created: value.created,
			modified: value.modified,
			unReadMessage: value.unReadMessage,
			friendInfo: {
				name: value.name,
				phone: value.phone,
				profile: value.profile,
				isInvite: value.isInvite,
				contactName: value.contactName,
				addBy: value.addBy,
			},
		};
		if (value.profile) {
			chats.friendInfo.profile = global.appURL + "uploads/" + value.profile;
		}
		if (value.messageType !== 0) {
			chats.message = global.appURL + "uploads/" + value.message;
		}
		return chats;
	});
};
