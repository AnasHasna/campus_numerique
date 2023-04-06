import axios from "axios";

const getStatistiques = async (moduleId, token) => {
  return await axios.get(
    `http://localhost:5000/modules/${moduleId}/statistiques`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getNotes = async (moduleId, token) => {
  return await axios.get(`http://localhost:5000/modules/${moduleId}/notes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const updateNotes = async (moduleId, token, data) => {
  return await axios.put(
    `http://localhost:5000/modules/${moduleId}/notes`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export { getStatistiques, getNotes, updateNotes };
