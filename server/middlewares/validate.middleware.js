
const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        if (error.issues) {
            return next({
                status: 400,
                message: error.issues[0].message
            });
        }
        next(error);
    }
};

export default validate;
