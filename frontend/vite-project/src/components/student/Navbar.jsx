import { useEffect, useState } from "react";
import {
  Bell,
  Calendar,
  Check,
  Trash2,
  MailOpen
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import EventCalendar from "./EventCalendar";

export default function Navbar() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // 🔢 Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/notifications/unread-count",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setUnreadCount(res.data.unreadCount);
    } catch (err) {
      console.error("Error fetching count:", err);
    }
  };

  // 📋 Fetch notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/notifications",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setNotifications(res.data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
    }
  };

  // ✅ Mark as read
  const handleMarkRead = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/notifications/read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUnreadCount();
      fetchNotifications();
    } catch (err) {
      console.error("Error marking read:", err);
    }
  };

  // 🗑️ Delete notification
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/notifications/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUnreadCount();
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) fetchNotifications();
  };

  return (
    <>
      <header className="flex justify-between items-center bg-white shadow px-6 py-4 relative z-50">
        <h1 className="text-xl font-semibold text-slate-800">
          Welcome, {user?.name || "Student"} 👋
        </h1>

        <div className="flex gap-4 items-center">
          {/* 📅 Calendar Icon */}
          <Calendar
            className="cursor-pointer text-slate-600 hover:text-blue-600 transition-colors"
            onClick={() => setShowCalendar(true)}
          />

          {/* 🔔 Notification Bell */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="relative p-2 rounded-full hover:bg-slate-100 transition-all focus:outline-none"
            >
              <Bell className="text-slate-600 w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3 w-85 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 text-sm">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="bg-blue-100 text-blue-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {unreadCount} New
                      </span>
                    )}
                  </div>
                  <MailOpen size={16} className="text-slate-400" />
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-10 text-center text-slate-400 text-sm italic">
                      No placement drives posted yet.
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif._id}
                        className={`p-4 border-b border-slate-50 hover:bg-slate-50 flex justify-between gap-3 transition-colors ${
                          !notif.isRead ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex-1">
                          <p
                            className={`text-sm leading-relaxed ${
                              !notif.isRead
                                ? "text-slate-900 font-medium"
                                : "text-slate-600"
                            }`}
                          >
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-slate-400 mt-2 block">
                            {new Date(notif.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {!notif.isRead && (
                            <button
                              onClick={() => handleMarkRead(notif._id)}
                              className="p-1.5 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Check size={14} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(notif._id)}
                            className="p-1.5 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 📅 Calendar Modal */}
      {showCalendar && (
        <EventCalendar onClose={() => setShowCalendar(false)} />
      )}
    </>
  );
}
