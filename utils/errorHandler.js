import { NotificationManager } from "react-notifications";

export const errorHandler = (error) => {
  NotificationManager.error(error?.response?.data?.message || error.message);
};
