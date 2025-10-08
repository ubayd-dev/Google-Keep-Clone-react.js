import cron from "node-cron";
import { sendDueReminders } from "../services/reminderjob.js";

/**
 * Starts the cron job that runs every minute.
 */
export function startReminderScheduler() {
  cron.schedule("* * * * *", async () => {
    console.log("Checking for due reminders...");
    await sendDueReminders();
  });
}
