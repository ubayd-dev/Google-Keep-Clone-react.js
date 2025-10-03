// src/db.js
import pkg from '../generated/prisma/index.js'; // point to generated Prisma client
const { PrismaClient } = pkg;

const prisma = new PrismaClient();
export default prisma;
