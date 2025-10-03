import cron from "node-cron";
import prisma from "../db.js";
import { sendEmail } from "../utils/mailer.js";

cron.schedule("* * * * *", async () => {
  const now = new Date();

  const dueReminder = await prisma.reminder.findMany({
    where: {
      remindAt: { lte: now },
      isSent: false,
    },
    include: { note: true },
  });

  for (const reminder of dueReminder) {
    console.log("Reminder for Note", reminder.note.title);

    const to = reminder.email;
    const subject = `Reminder: ${reminder.title}`;
    const text = `Hey Don't forget: ${reminder.note.title}`;

    console.log(`Sending reminder email to: ${to}`);

    await sendEmail(to, subject, text);

    await prisma.reminder.update({
      where: { id: reminder.id },
      data: { isSent: true },
    });
  }
});
