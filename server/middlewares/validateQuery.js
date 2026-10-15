const validateQuery = (schema) => async (req, res, next) => {
   try {
    const parseQuery=await schema.parseAsync(req.query)
    Object.assign(req.query,parseQuery)
    next()
   } catch (error) {
    if(error.issues){
        return next({
                status: 400,
                message: error.issues[0].message
            });
    }
    next(error)
   }
}
export default validateQuery