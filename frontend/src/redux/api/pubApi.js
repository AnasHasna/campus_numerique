import axios from "axios";

const getAllPubs = async (id, token) => {
  return await axios.get(`http://localhost:5000/modules/${id}/pubs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getSinglePub = async (pubId, token) => {
  return await axios.get(`http://localhost:5000/pub/${pubId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addPub = async ({ id, data, token }) => {
  return await axios.post(`http://localhost:5000/modules/${id}/pubs`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

const downloadFile = async (id) => {
  return await axios.get(`http://localhost:5000/files/download/${id}`, {
    responseType: "blob",
  });
};

export { getAllPubs, addPub, downloadFile, getSinglePub };
