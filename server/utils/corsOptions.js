const whitelist = [
    "https://janhunen-workout-tracker.netlify.app",
    "http://localhost:3000",
];
export const corsOptions = {
    // credentials: true,
    origin: function (origin, callback) {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
