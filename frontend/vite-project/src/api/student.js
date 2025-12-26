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

export const downloadPortfolio = async () => {
  const res = await api.get("/portfolio/generate", {
    responseType: "blob",
  });
  return res.data;
};
export const getPortfolioView = async () => {
  const res = await api.get("/portfolio/view");
  return res.data;
};

export const updateProfile = async (data) => {
  const res = await api.put("/profile/update", data);
  return res.data;
};
export const getMyProfile = async () => {
  const res = await api.get("/profile/me");
  return res.data;
};
