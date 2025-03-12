import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { baseUrl } from "../baseUrl";
import axiosInstance from "./token";

// Helper function to handle GET requests
const fetchData = async (url, lang) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}${url}?lang=${lang}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network response was not ok");
  }
};

// Helper function to handle POST requests
const postData = async (url, data) => {
  try {
    const response = await axiosInstance.post(`${baseUrl}${url}`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Network request failed");
  }
};

// Fetch all notifications
const fetchNotifications = async ({ lang = "ar" }) => fetchData("notifications", lang);

// Fetch unread notifications
const fetchNotNotifications = async ({ lang = "ar" }) => fetchData("notifications/unread", lang);

// Fetch notification count
const fetchCount = async ({ lang = "ar" }) => fetchData("notifications/count", lang);

// Mark a single notification as read
const markNotificationRead = async (id) => postData(`notifications/${id}/read`, {});

// Mark all notifications as read
const markAllNotificationsRead = async () => postData("notifications/mark-all-read", {});

// Reusable query configuration
const useNotificationQuery = (queryKey, queryFn, lang = "ar") => {
  return useQuery({
    queryKey: [queryKey, lang],
    queryFn: () => queryFn({ lang }),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 2,
  });
};

// Custom hooks for fetching notifications
export const useFetchNotifications = ({ lang = "ar" } = {}) => 
  useNotificationQuery("notifications", fetchNotifications, lang);

export const useFetchNotNotifications = ({ lang = "ar" } = {}) => 
  useNotificationQuery("unread-notifications", fetchNotNotifications, lang);

export const useFetchCount = ({ lang = "ar" } = {}) => 
  useNotificationQuery("notification-count", fetchCount, lang);

// Custom hooks for marking notifications as read
export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  return useMutation(markNotificationRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread-notifications"]);
      queryClient.invalidateQueries(["notification-count"]);
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  return useMutation(markAllNotificationsRead, {
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      queryClient.invalidateQueries(["unread-notifications"]);
      queryClient.invalidateQueries(["notification-count"]);
    },
  });
};
