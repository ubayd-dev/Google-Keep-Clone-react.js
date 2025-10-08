import prisma from "../db.js";
import jwt from "jsonwebtoken";

class NotesController {
  static async createNotes(req, res, next) {
    console.log("creating note");

    try {
      // Get Authorization header
      const authHeader = req.headers.authorization;
      // Extract token
      const token = authHeader.split(" ")[1];
      console.log("log token", token);
      // Verify and decode JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("log decoded part", decoded);
      // Extract user UUID (assuming JWT payload has `userId` or `uuid`)
      const userUuid = decoded.uuid;
      if (!userUuid) {
        return res.status(400).json({ message: "Invalid token payload" });
      }

      const { title, content } = req.body;
      const note = await prisma.notes.create({
        data: {
          title,
          content,
          user: {
            connect: { id: userUuid },
          },
        },
      });
      res.status(201).json(note);
    } catch (e) {
      next(res.status(400).json({ error: "updated error" }));
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
    const userId = req.user.id;

    try {
      const note = await prisma.notes.deleteMany({
        where: {
          id,
          userId,
        },
      });
      if (note.count === 0) {
        return res.status(404).json({ message: "Note not found or not yours" });
      }
      res.json({ message: "Note deleted successfully" });
    } catch (e) {
      console.error("Error deleting note:", e);
      res.status(500).json({ error: "Internal server error deleting note" });
    }
  }
}

export default NotesController;
