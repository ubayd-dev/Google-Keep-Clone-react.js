import { Router } from "express";
import ReminderController from "../controllers/Reminder.js";

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
    this.router.post("/", ReminderController.createReminder);
  }

  patchRoutes() {}

  deleteRoutes() {}
}

export default new ReminderRouter().router;
