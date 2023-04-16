import axios from "axios";

const getNotifications = async (token) => {
  return await axios.get(`http://localhost:5000/notifications`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const readNotification = async (notificationId, token) => {
  return await axios.put(
    `http://localhost:5000/notifications/${notificationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getNotifications, readNotification };
