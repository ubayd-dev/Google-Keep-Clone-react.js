import { PrismaClient } from "../../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class UserController {
  // create a new user
  static async CreateUser(req, res, next) {
    const { name, email } = req.body;

    try {
      const user = await prisma.user.upsert({
        where: {
          email: email,
        },
        update: {},
        create: {
          email,
          name,
        },
      });

      //   Generate JWT Token
      const token = jwt.sign({ uuid: user.id }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      res.status(201).json({ token, user });
    } catch (e) {
      next(e);
    }
  }

  static async LoginUser(req, res, next) {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      const token = jwt.sign({ uuid: user.id }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      res.status(201).json({ token, user });
    } catch (e) {
      next(e);
    }
  }

  static async GetUsers(req, res, next) {
    // fetch all users from DB
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
export default UserController;
