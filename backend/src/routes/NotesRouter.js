import { Router } from "express";
import NotesController  from "../controllers/Notes.js";

class NotesRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
        this.router.get("/", NotesController.getNotes);
  }

  postRoutes() {
    this.router.post("/create", NotesController.createNotes);
  }

  patchRoutes() {
    this.router.patch("/", NotesController.updateNotes);
  }

  deleteRoutes() {
       this.router.delete("/", NotesController.deleteNotes);
  }
}

export default new NotesRouter().router;