import axios from "axios";

const getModuleInfo = async (moduleId, token) => {
  return await axios.get(`http://localhost:5000/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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
const getStudents = async (moduleId, token) => {
  return await axios.get(`http://localhost:5000/modules/${moduleId}/students`, {
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

const getInvitations = async (moduleId, token) => {
  return await axios.get(
    `http://localhost:5000/modules/${moduleId}/invitations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const confirmInvitations = async (moduleId, token, invitId) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/invitations`,
    { invitationId: invitId },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const rejetInvitations = async (moduleId, token, invitId) => {
  return await axios.delete(
    `http://localhost:5000/modules/${moduleId}/invitations`,
    { invitationId: invitId },

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export {
  getStatistiques,
  getNotes,
  updateNotes,
  getModuleInfo,
  getInvitations,
  confirmInvitations,
  rejetInvitations,
};
