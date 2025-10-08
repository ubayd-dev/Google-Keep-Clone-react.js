import { Router } from "express";
import ReminderController from "../controllers/Reminder.js";
import { authenticateToken } from "../middleware/index.js";

class ReminderRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post("/",authenticateToken, ReminderController.createReminder);
  }

  patchRoutes() {}

  deleteRoutes() {}
}

export default new ReminderRouter().router;
