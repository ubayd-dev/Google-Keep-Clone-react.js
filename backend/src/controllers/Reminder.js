import prisma from "../db.js";

class ReminderController {
  static async createReminder(req, res, next) {
    const { noteId, remindAt, email, title, isSent } = req.body;

    try {
      const reminder = await prisma.reminder.create({
        data: {
          noteId,
          remindAt: new Date(remindAt),
          email,
          title,
          isSent: isSent || false,
        },
      });
      res.status(201).json(reminder);
    } catch (e) {
      next(res.status(401).json({ error: e.message }));
    }
  }
}

export default ReminderController;
