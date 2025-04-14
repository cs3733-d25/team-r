import express, { Router, Request, Response } from "express";
import PrismaClient from "../bin/prisma-client.ts";
import { Prisma } from "../../../../packages/database";
import PrismaClientValidationError = Prisma.PrismaClientValidationError;
import { RequestPriority, Department } from "../../../../packages/database";

const router: Router = express.Router();

