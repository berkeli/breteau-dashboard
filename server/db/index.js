import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const disconnectDb = async () => {
	prisma.$disconnect();
};
