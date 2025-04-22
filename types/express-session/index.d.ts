import "express-session";

declare module "express-session" {
    interface SessionData {
        userId: '';
        username: '';
        userType: '';
    }
}

// import { User } from '../models/user';
//
// declare global {
//     namespace Express {
//         interface Session {
//             _user?: User
//         }
//     }
// }