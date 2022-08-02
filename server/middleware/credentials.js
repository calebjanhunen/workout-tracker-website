import { allowedDomains } from "../utils/allowedDomains.js";

export function credentials(req, res, next) {
    if (allowedDomains.includes(req.headers.origin))
        res.header("Access-Control-Allow-Credentials", true);

    next();
}
