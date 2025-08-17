// import { PrismaClient } from "@/lib/generated/prisma";
// // import { PrismaClient } from "@prisma/client";
// const db = new PrismaClient();

// export default db;

// lib/prisma.ts
import { PrismaClient } from "@/lib/generated/prisma";
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
