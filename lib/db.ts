import { PrismaClient } from "@/lib/generated/prisma";
// import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default db;
