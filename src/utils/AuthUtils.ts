import { Request, Response, NextFunction } from "express";
import { jwtVerify } from "./JwtUtils";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.headers && req.method !== 'OPTIONS' && req.headers.authorization) {
        const bearer = req.headers.authorization.split(" ");

        if (bearer[0] === "Bearer" && bearer[1]) {
            jwtVerify(bearer[1], 'RESTFULAPIs', function (err, decode) {
                if (err) req.user = undefined;
                else req.user = decode;
                next();
            });
        } else {
            req.user = undefined;
            next();
        }
    } else {
        req.user = undefined;
        next();
    }
}

export function loginRequired(req: Request, res: Response, next: NextFunction) {
    if (req.headers && req.method !== 'OPTIONS') {
        if (req.user) {
            next();
        } else {
            return res.status(401)
                .json({});
        }
    } else {
        next();
    }
}
