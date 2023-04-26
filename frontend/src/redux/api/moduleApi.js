import axios from "axios";

const getAllModules = async (userId, userType, token) => {
  return await axios.post(
    `http://localhost:5000/modules/all`,
    {
      userId,
      userType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const createModules = async (
  teacherId,
  name,
  classe,
  identifiant,
  color,
  token
) => {
  return await axios.post(
    `http://localhost:5000/modules`,
    {
      teacherId,
      identifiant,
      name,
      classe,
      color,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const searchModules = async (studentId, token, identifiant) => {
  return await axios.post(
    `http://localhost:5000/modules/search`,
    {
      identifiant,
      studentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const sendInvitation = async (moduleId, studentId, token) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/invitations`,
    {
      studentId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

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
    `http://localhost:5000/modules/${moduleId}/invitations/${invitId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const rejectInvitations = async (moduleId, token, invitId) => {
  return await axios.delete(
    `http://localhost:5000/modules/${moduleId}/invitations/${invitId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getChats = async (moduleId, token, isTeacher) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/chats`,
    {
      isTeacher,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
const getSingleChat = async (moduleId, token, chatId) => {
  return await axios.get(
    `http://localhost:5000/modules/${moduleId}/chats/${chatId}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const sendMessage = async (moduleId, token, isTeacher, message, chatId) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/chats/${chatId}`,
    {
      isTeacher,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const updateModule = async (moduleId, token, name, classe) => {
  return await axios.put(
    `http://localhost:5000/modules/${moduleId}`,
    {
      name,
      classe,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const deleteModule = async (moduleId, token) => {
  return await axios.delete(`http://localhost:5000/modules/${moduleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const exitFromModule = async (moduleId, token, userId) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/exit`,
    {
      userId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const generateAutoId = (token) => {
  return axios.get(`http://localhost:5000/modules/generateAutoId`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//=======Tasks
const getAllTasks = async (moduleId, token) => {
  return await axios.get(`http://localhost:5000/modules/${moduleId}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addTask = async (data, moduleId, token) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/tasks`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const getSingleTask = async (moduleId, taskId, token) => {
  return await axios.get(
    `http://localhost:5000/modules/${moduleId}/tasks/${taskId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const answerTask = async (moduleId, taskId, token, data) => {
  return await axios.post(
    `http://localhost:5000/modules/${moduleId}/tasks/${taskId}/answer`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
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
  rejectInvitations,
  getStudents,
  getChats,
  getSingleChat,
  sendMessage,
  getAllModules,
  createModules,
  sendInvitation,
  searchModules,
  updateModule,
  deleteModule,
  exitFromModule,
  generateAutoId,
  getAllTasks,
  addTask,
  getSingleTask,
  answerTask,
};
