
import axios from "./axios"
export const getPlacementDashboard = async () => {
  const res = await axios.get("/placement/dashboard");
  return res.data;
};

; // your axios instance with token

export const getJobDrives = async () => {
  const res = await axios.get("/drives");
  return res.data;
};

export const createJobDrive = async (payload) => {
  const { data } = await axios.post("/drives/create", payload);
  return data;
};