import prisma from "../db.js";

class TasksController {
  static async createTask(req, res, next) {
    const { title, description, notesId } = req.body;
    try {
      const task = await prisma.tasks.create({
        data: {
          title,
          description,
          notesId,
        },
      });
      res.status(201).json(task);
    } catch (e) {
      res.status(401).json({ error: error.message });
    }
  }

  static async getTask(req, res, next) {
    const tasks = await prisma.tasks.findMany({
      include: {
        notes: true,
      },
    });
    res.json(tasks);
  }

  static async updateTask(req, res, next) {
    const { id } = req.params;
    const { title, description, status } = req.body;

    try {
      const tasks = await prisma.tasks.update({
        where: { id: id },
        data: {
          title,
          description,
          status,
        },
      });
      res.json(tasks);
    } catch (e) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateTaskStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    try {
      const task = await prisma.tasks.update({
        where: { id },
        data: {
          status,
        },
      });

      res.json(task);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }

  static async deleteTask(req, res, next) {
    const { id } = req.params;

    try {
      const tasks = await prisma.tasks.delete({
        where: { id },
      });
      res.json({ message: "Tasks deleted successfully" });
    } catch (e) {
      next(res.status(400).json({ error: error.message }));
    }
  }
}

export default TasksController;
