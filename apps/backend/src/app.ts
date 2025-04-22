import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import healthcheckRouter from "./routes/healthcheck";
import employeeRouter from "./routes/employee.ts";
import servicereqRouter from "./routes/servicereqs.ts";
import assignedRouter from "./routes/assigned.ts";
import csvRouter from "./routes/csv.ts";
import loginRouter from "./routes/login.ts";
import sanitationRouter from "./routes/sanitationreqs.ts";
import bfsRouter from "./routes/bfs.ts";
import patientRequestRouter from "./routes/patientRequest.ts";
import pharmacyRouter from "./routes/pharmacyreqs.ts";
import enumRouter from "./routes/enum.ts";
import transportRequestRouter from "./routes/transportreqs.ts";
import deviceRequestRouter from "./routes/devicereqs.ts";
import mapRouter from "./routes/mapData.ts";
import nodesRouter from "./routes/nodes.ts";
import { API_ROUTES } from "common/src/constants";

const app: Express = express(); // Setup the backend

// Setup generic middlewear
app.use(
  logger("dev", {
    stream: {
      // This is a "hack" that gets the output to appear in the remote debugger :)
      write: (msg) => console.info(msg),
    },
  }),
); // This records all HTTP requests

app.use(express.json()); // This processes requests as JSON
app.use(express.urlencoded({ extended: false })); // URL parser
app.use(cookieParser()); // Cookie parser

// Setup routers. ALL ROUTERS MUST use /api as a start point, or they
// won't be reached by the default proxy and prod setup
// TODO: refactor to put all of the requests in a single router
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.EMPLOYEE, employeeRouter);
app.use(API_ROUTES.SERVICE, servicereqRouter);
app.use(API_ROUTES.ASSIGNED, assignedRouter);
app.use(API_ROUTES.LOGIN, loginRouter);
app.use(API_ROUTES.SANITATION, sanitationRouter);
app.use(API_ROUTES.CSV, csvRouter);
app.use(API_ROUTES.BFS, bfsRouter);
app.use(API_ROUTES.PATIENTREQ, patientRequestRouter);
app.use(API_ROUTES.PHARMACY, pharmacyRouter);
app.use(API_ROUTES.ENUM, enumRouter);
app.use(API_ROUTES.TRANSPORT, transportRequestRouter);
app.use(API_ROUTES.DEVICE, deviceRequestRouter);
app.use(API_ROUTES.MAP, mapRouter);
app.use(API_ROUTES.NODES, nodesRouter);
/**
 * Catch all 404 errors, and forward them to the error handler
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Have the next (generic error handler) process a 404 error
  next(createError(404));
});

/**
 * Generic error handler
 */
app.use((err: HttpError, req: Request, res: Response) => {
  // Provide the error message
  res.statusMessage = err.message;

  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Reply with the error
  res.status(err.status || 500);
});

// Export the backend, so that www.ts can start it
export default app;
