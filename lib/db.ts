// // // import { PrismaClient } from "@/lib/generated/prisma";
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

export default db;

// const globalForPrisma = global as unknown as { prisma: PrismaClient };

// export const db =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     log: ["query", "error", "warn"],
//   });

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
