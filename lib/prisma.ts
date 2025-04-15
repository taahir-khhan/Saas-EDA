import { PrismaClient } from "@prisma/client";

// It's creates a new instance of PrismaClient every time it is called.
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// This defines a type alias for the return type of the prismaClientSingleton function.
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

/* 
      - Here, we extend the global object (globalThis) to include a custom property 'prisma'. 
      - This allows us to store the Prisma client instance globally, so it can persist between module reloads.
      - This is especially useful in development environments with hot-reloading (like Next.js).
*/
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

/* 
      - Check if a Prisma client instance already exists on the global object.
      - If it exists (i.e., already connected to the database), reuse it.
      - If not, create a new instance using the singleton function.
*/
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

/* 
      - In development mode, assign the created Prisma client instance to the global object.
      - This ensures that the same instance is reused across hot-reloads,
      - preventing multiple simultaneous connections to the database.
*/
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
