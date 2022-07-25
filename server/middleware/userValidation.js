import joi from "joi";

export function userValidation(req, res, next) {
    const payload = {
        username: req.body.username,
        password: req.body.password,
    };

    const { error } = validation.validate(payload);
    if (error) {
        res.status(400).json({ message: error.message });
    } else {
        next();
    }
}

const validation = joi.object({
    username: joi.string().min(4).required().trim(true),
    password: joi.string().min(8).required().trim(true),
});
