"use strict";
// src/prisma/index.ts (ou src/prisma.ts)
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client"); // Importe *exatamente* assim
const prismaClient = new client_1.PrismaClient();
exports.default = prismaClient;
