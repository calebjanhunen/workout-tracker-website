import { allowedDomains } from "./allowedDomains.js";

export const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
