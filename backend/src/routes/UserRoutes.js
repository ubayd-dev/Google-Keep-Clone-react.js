import { Router } from "express";
import { UserValidator } from "../validators/UserValidator.js";
import UserController from "../controllers/User.js";

class UserRouter {
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
  }

  getRoutes() {
    this.router.get("/", UserController.GetUsers);
  }

  postRoutes() {
    this.router.post("/", UserController.CreateUser);
    this.router.post("/login", UserController.LoginUser);
  }
}

export default new UserRouter().router;
