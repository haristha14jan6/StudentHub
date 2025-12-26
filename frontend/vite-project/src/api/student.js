import api from "./axios";

export const uploadCertificate = (formData) =>
  api.post("/submissions/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getMySubmissions = () =>
  api.get("/submissions/my");

export const getLeaderboard = () =>
  api.get("/leaderboard");

export const getNotifications = () =>
  api.get("/notifications");
