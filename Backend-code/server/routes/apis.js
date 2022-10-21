const express = require('express');
const router = express.Router();
const {UserController, ChatController} = require('../src/Controller/v1/index');
const {
  UserAuth,
  cross,
  Language,
  AuthSkip,
} = require('../src/middleware/index');
const Apiresponse = require('../helper/ApiResponse');
const {userSignup} = require('../src/Request');
const user = new UserController();

router.use([cross, Language, AuthSkip, UserAuth]);
router.get('/', function (req, res) {
  res.send(' APi workings ');
});

router.post('/user/login', Apiresponse(user.loginUser));
router.post('/user/signup', userSignup, Apiresponse(user.addUser));
router.post('/user/profile', Apiresponse(user.updateProfile));
router.post('/verify-otp', Apiresponse(user.verifyOtp));
router.post('/resend-otp', Apiresponse(user.resendOtp));
router.post('/logout', Apiresponse(user.logout));
router.get('/app-information', Apiresponse(user.appInfo));
router.delete('/delete-account', Apiresponse(user.deleteAccount));
router.post('/sync-contacts', Apiresponse(user.getMobileUser));
/** chat */
router.post('/send-message', Apiresponse(ChatController.sendMessage));
router.post(
  '/send-message-phone',
  Apiresponse(ChatController.sendMessageByPhone),
);
router.post('/end-chat', Apiresponse(ChatController.endChat));
router.delete(
  '/delete-messages/:threadId([0-9]+)',
  Apiresponse(ChatController.deleteChat),
);
router.delete(
  '/delete-single-message/:chatId([0-9]+)',
  Apiresponse(ChatController.deleteSingleMessage),
);
router.get('/last-chat', Apiresponse(ChatController.lastChat));
router.get(
  '/get-message/:receiverId([0-9]+)',
  Apiresponse(ChatController.getMessage),
);
router.patch(
  '/read-message/:chat_id([0-9]+)',
  Apiresponse(ChatController.readMessage),
);
router.get('/getAllStickers', Apiresponse(ChatController.getAllStickers));
module.exports = router;
