export class NotesValidator {
  static validateCreateNote(req, res, next) {
    const { title, content, userId } = req.body;

    if (!title || typeof title !== "string") {
      return;
      res.status(400).json({ error: "Title is required and must be a string" });
    }

    if (!userId || typeof userId !== "string") {
      return;
      res
        .status(400)
        .json({ error: "UserId is required and must be a string" });
    }
  }

  static validateUpdatedNote(req, res, next) {
    const { title, content } = req.body;

    if (title && typeof title !== "string") {
      return;
      res.status(400).json({ error: "Title must be a string" });
    }
    if (content && typeof content !== "string") {
      return;
      res.status(400).json({ error: "Content must be a string" });
    }
  }
}
