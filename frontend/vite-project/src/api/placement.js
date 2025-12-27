import api from "./axios";

export const deleteJobDrive = async (id) => {
  const res = await api.delete(`/drives/${id}`);
  return res.data;
};

export const getJobDrives = async () => {
  const res = await api.get("/drives");
  return res.data;
};

export const createJobDrive = async (data) => {
  const res = await api.post("/drives/create", data);
  return res.data;
};
