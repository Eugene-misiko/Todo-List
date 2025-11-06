import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos"; 

export const getTasks = async () => {
  const res = await axios.get(`${API_URL}?_limit=10`);
  return res.data;
};

export const createTask = async (task) => {
  const res = await axios.post(API_URL, task);
  return res.data;
};

export const updateTask = async (id, updates) => {
  const res = await axios.put(`${API_URL}/${id}`, updates);
  return res.data;
};

export const deleteTask = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};