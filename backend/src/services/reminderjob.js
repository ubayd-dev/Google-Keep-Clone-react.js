import prisma from "../db.js";
import { sendEmail } from "../utils/mailer.js";

/**
 * This function checks for due reminders and sends emails.
 * Can be called manually or scheduled via a cron job.
 */
export async function sendDueReminders() {
  const now = new Date();

  try {
    const reminders = await prisma.reminder.findMany({
      where: { remindAt: { lte: now }, isSent: false },
      include: { note: true },
    });

    for (const reminder of reminders) {
      if (!reminder.email) {
        console.log(`Skipping reminder ${reminder.id} — no email provided`);
        continue;
      }

      const to = reminder.email;
      const subject = `Reminder: ${reminder.title}`;
      const text = `Don't forget: ${reminder.note.title}`;

      console.log(`Sending reminder email to: ${to}`);

      try {
        await sendEmail(to, subject, text);

        // Mark reminder as sent
        await prisma.reminder.update({
          where: { id: reminder.id },
          data: { isSent: true },
        });
      } catch (emailError) {
        console.error(`Failed to send email for reminder ${reminder.id}:`, emailError.message);
      }
    }
  } catch (err) {
    console.error("Error fetching reminders:", err.message);
  }
}
