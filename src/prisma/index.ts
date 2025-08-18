// src/prisma/index.ts (ou src/prisma.ts)

import { PrismaClient } from '@prisma/client'; // Importe *exatamente* assim

const prismaClient = new PrismaClient();

export default prismaClient;