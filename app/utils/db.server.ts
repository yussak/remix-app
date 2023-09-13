export const db = singleton("prisma", () => new PrismaClient());
