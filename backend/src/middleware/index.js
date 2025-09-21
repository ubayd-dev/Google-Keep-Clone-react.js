import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { PrismaClient } from "../../generated/prisma";

dotenv.config()
const prisma = new PrismaClient();

export async function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.sendStatus(401); // Unauthorized

    // Verify token
    let user;
    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.sendStatus(403); // Forbidden
    }

    // Check if user exists in DB
    const hasUser = await prisma.user.findUnique({
      where: { id: user.uuid },
    });

    if (!hasUser) return res.sendStatus(404); // User not found

    req.user = hasUser;
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res
      .status(500)
      .json({ error: "Internal server error during authentication." });
  }
}
// export async function authenticateToken(req, res, next) {
//     try {
//         const token = req.headers["authorization"]?.split(" ")[1];
//         if (!token) return res.sendStatus(401);
//         // Unauthorized

//         jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//             const hasUser = await prisma.user.findUnique({
//                 where: {
//                     id: user.uuid,
//                 },
//             });
        
//             if (err) return res.sendStatus(403);
//             // Forbidden
//             req.user = user;

//             next();
//         });
//     } catch (e) {
//         console.error('Authorization error:', error)
//         res.status(500).json ({error: "internal server error during authentication."})
//     }
// }
