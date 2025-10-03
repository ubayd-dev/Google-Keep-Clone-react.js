import prisma from "../db.js";

class NotesController {
  static async createNotes(req, res, next) {
    const { title, content, userId } = req.body;

    try {
      const note = await prisma.notes.create({
        data: {
          title,
          content,
          user: {
            connect: { id: userId },
          },
        },
      });
      res.status(201).json(note);
    } catch (e) {
      next(res.status(401).json({ error: e.message }));
    }
  }

  static async getNotes(req, res) {
    const notes = await prisma.notes.findMany({
      include: {
        user: true,
        tasks: true,
      },
    });
    res.json(notes);
  }

  static async updateNotes(req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
      const notes = await prisma.notes.update({
        where: {
          id,
        },
        data: {
          title,
          content,
        },
      });
      res.json(notes);
    } catch (e) {
      next(e);
    }
  }

  static async deleteNotes(req, res, next) {
    const { id } = req.params;

    try {
      const notes = await prisma.notes.delete({
        where: {
          id,
        },
      });
      res.json({ message: "Note deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

export default NotesController;
