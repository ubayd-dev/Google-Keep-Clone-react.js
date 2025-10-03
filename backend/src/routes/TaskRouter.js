import { Router } from "express";
import TaskController from '../controllers/Tasks.js'

class TaskRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
        this.router.get("/", TaskController.getTask);
  }

  postRoutes() {
    this.router.post("/", TaskController.createTask);
  }

  patchRoutes() {
    this.router.patch("/", TaskController.updateTask);
  }

  deleteRoutes() {
       this.router.delete("/", TaskController.deleteTask);
  }
}

export default new TaskRouter().router;