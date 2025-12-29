//@ts-nocheck
import api from "./axios";

export const createEvent = (formData) =>
  api.post("/events/create", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

export const getEvents = () =>
  api.get("/events");

export const deleteEvent = (id) => {
  return api.delete(`/events/${id}`);
};