import createError, { HttpError } from "http-errors";
import express, { Express, NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import healthcheckRouter from "./routes/healthcheck";
import employeeRouter from "./routes/employee.ts";
import servicereqRouter from "./routes/servicereqs.ts";
import assignedRouter from "./routes/assigned.ts";
import sanitationRouter from "./routes/sanitationreqs.ts";
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
app.use(API_ROUTES.HEALTHCHECK, healthcheckRouter);
app.use(API_ROUTES.EMPLOYEE, employeeRouter);
app.use(API_ROUTES.SERVICE, servicereqRouter);
app.use(API_ROUTES.ASSIGNED, assignedRouter);
app.use(API_ROUTES.SANITATION, sanitationRouter);

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
