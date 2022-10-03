import messaging from '@react-native-firebase/messaging';
import AsyncStorageUtil from './AsyncStorageUtils';

const NOTIFICATION_ID = 'NOTIFICATION_ID';
class PushNotificationsHelper {
  constructor() {
    this.unsubscribe = null;
    this.onNotificationOpenedListener = null;
  }
  handleNotifications = async (notificationData, callback) => {};

  setUpMessageListener = async callBack => {
    try {
      this.unsubscribe = messaging().onMessage(async notificationData => {
        if (typeof callBack === 'function') {
          callBack(notificationData, false);
        }
      });

      this.onNotificationOpenedListener = messaging().onNotificationOpenedApp(
        notificationData => {
          this.handleNotifications(notificationData, true);
          if (typeof callBack === 'function') {
            callBack(notificationData, true);
          }
        },
      );
      await messaging().setBackgroundMessageHandler(async notificationData => {
        this.handleNotifications(notificationData, true);
        if (typeof callBack === 'function') {
          callBack(notificationData, false);
        }
      });
      const notificationData = await messaging()
        .getInitialNotification()
        .then(async remoteMessage => {
          if (remoteMessage) {
            const notificationId = await AsyncStorageUtil.getItemFromStorage(
              NOTIFICATION_ID,
            );

            if (notificationId !== remoteMessage?.messageId) {
              AsyncStorageUtil.setItemInStorage(
                NOTIFICATION_ID,
                remoteMessage.messageId,
              );
              if (typeof callBack === 'function') {
                callBack(remoteMessage, true);
              }
            }
          }
        });

      notificationData && this.handleNotifications(notificationData, false);
    } catch (error) {}
  };
  unsubscribeListener = async () => {
    if (!this.unsubscribe || !this.onNotificationOpenedListener) {
      return;
    }
    this.unsubscribe();
    this.onNotificationOpenedListener();
  };
}
export default PushNotificationsHelper;
