import Contacts from 'react-native-contacts';
import notifee, {AndroidImportance, TriggerType} from '@notifee/react-native';
import {strings} from 'locales/i18n';
export function setTestIdentifier(id) {
  return {testID: id, accessibilityLabel: id};
}

export const getAllContacts = async () => {
  try {
    return await Contacts.getAll();
  } catch (err) {
    return [];
  }
};
const addZero = number => {
  if (number < 10) {
    return `0${number}`;
  }
  return number;
};
export const timeSince = (timeStamp, isShowTime) => {
  try {
    if (!timeStamp) {
      return '';
    }
    var now = new Date();
    const secondsPast = (now.getTime() - timeStamp) / 1000;
    if (secondsPast <= 86400 && isShowTime) {
      const messageTime = new Date(timeStamp);
      const hours = addZero(messageTime.getHours());
      const mins = addZero(messageTime.getMinutes());
      return `${hours}:${mins}`;
    }
    if (secondsPast < 0 && secondsPast < 1) {
      return 'now';
    }
    if (secondsPast < 60) {
      return Math.round(secondsPast) + 's';
    }
    if (secondsPast < 3600) {
      return Math.round(secondsPast / 60) + 'm';
    }
    if (secondsPast <= 86400) {
      return Math.round(secondsPast / 3600) + 'h';
    }
    if (secondsPast > 86400) {
      timeStamp = new Date(timeStamp);
      let day = timeStamp.getDate();
      let month = timeStamp
        .toDateString()
        .match(/ [a-zA-Z]*/)[0]
        .replace(' ', '');
      let year =
        timeStamp.getFullYear() == now.getFullYear()
          ? ''
          : ' ' + timeStamp.getFullYear();
      return day + ' ' + month + year;
    }
  } catch (err) {
    return '';
  }
};

export const createLocalNotification = async (
  notificationId,
  title,
  body,
  intervalMinutes,
  type,
  notificationData = '',
) => {
  await notifee.createChannel({
    id: notificationId,
    name: strings('chatScreen.activeChat'),
    importance: AndroidImportance.HIGH,
  });

  await notifee.createTriggerNotification(
    {
      title,
      body,
      ios: {
        sound: 'default',
      },
      android: {
        sound: 'default',
        channelId: notificationId,
        importance: AndroidImportance.HIGH,
        pressAction: {
          launchActivity: 'default',
          id: 'default',
        },
      },
      data: {
        type,
        notificationData,
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: new Date().getTime() + intervalMinutes * 60000,
    },
  );
};

export const removeLocalNotification = async (notificationId, type) => {
  const all = await notifee.getTriggerNotifications();

  const filtered = all
    .filter(({notification}) => {
      return notification.data?.type === type;
    })
    .map(({notification}) => {
      return notification.id;
    });
  await notifee.cancelAllNotifications(filtered);
  await notifee.deleteChannel(notificationId);
};
