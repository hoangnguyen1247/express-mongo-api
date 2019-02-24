import * as jwt from "jsonwebtoken";

export function jwtSign(data, salt = "RESTFULAPIs", options = {expiresIn: "2 days"}, callback = null) {
    return jwt.sign({...data}, salt, options, callback);
}

export function jwtVerify(token, salt = "RESTFULAPIs", callback = null) {
    jwt.verify(token, salt, callback);
}