import { PrismaClient } from "../../generated/prisma";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

class UserController {
  // create a new user

  static async CreateUser(req, res, next) {
    const { name, email } = req.body;

    try {
      const newUser = await prisma.user.create({
        email: email,
        name: name,
      });

      //   Generate JWT Token
      const token = jwt.sign({ uuid: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "6h",
      });
      res.status(201).json({ token });
    } catch (e) {
      next(e);
    }
  }
}
export default UserController;
