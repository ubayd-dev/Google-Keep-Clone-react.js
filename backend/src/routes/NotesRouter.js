import { Router } from "express";
import NotesController from "../controllers/Notes.js";
import { authenticateToken } from "../middleware/index.js";

class NotesRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get("/", authenticateToken, NotesController.getNotes);
  }

  postRoutes() {
    this.router.post("/create", authenticateToken, NotesController.createNotes);
  }

  patchRoutes() {
    this.router.patch("/", authenticateToken, NotesController.updateNotes);
  }

  deleteRoutes() {
    this.router.delete("/", authenticateToken, NotesController.deleteNotes);
  }
}

export default new NotesRouter().router;
