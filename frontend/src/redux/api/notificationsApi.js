import axios from "axios";

const getNotifications = async (userId, token) => {
  return await axios.get(`http://localhost:5000/notifications/:${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const readNotification = async (notificationId, token) => {
  return await axios.put(
    `http://localhost:5000/notifications/:${notificationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getNotifications, readNotification };
