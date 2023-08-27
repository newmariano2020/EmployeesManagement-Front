import axios from "axios";

const BASE_URL = "http://localhost:3000";

export const getAllEmployees = (id) => {
  return axios.get(`${BASE_URL}/api/employees/${id}`);
};

export const getEmployeeById = (id) => {
  return axios.get(`${BASE_URL}/api/employees/${id}`);
};

export const createEmployees = (newEmployeeData) => {
  return axios.post(`${BASE_URL}/api/employees`, newEmployeeData);
};

export const updateEmployee = (data) => {
  const { id } = data;

  return axios.patch(`${BASE_URL}/api/employees/${id}`, data);
};

export const deleteEmployee = (id, userIdDelete) => {
  const config = {
    data: { userId: userIdDelete },
  };
  return axios.delete(`${BASE_URL}/api/employees/${id}`, config);
};

export const loginUser = (data) => {
  return axios.post(`${BASE_URL}/api/login/`, data);
};

export const createUser = (data) => {
  return axios.post(`${BASE_URL}/api/users/`, data);
};

export const getUser = (email) => {

  return axios.get(`${BASE_URL}/api/users/${email}`);
};

export const getEmployeeFileList = () => {
  return axios.get(`${BASE_URL}/api/download-employee-list`, {
    responseType: "blob",
  });
};

export const deleteUser = (email, idUser) => {
  const config = {
    data: {
      user_id: idUser,
    },
  };

  return axios.delete(`${BASE_URL}/api/users/${email}`, config);
};

export const updateUserAvatar = (data, id) => {
  return axios.patch(`${BASE_URL}/api/users/${id}`, data);
};
