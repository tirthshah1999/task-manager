// For redundant try-catch block

const asyncWrapper = (cb) => {
    return async (req, res, next) => {
        try{
            // controller will get req, res, next
            await cb(req, res, next);
        }catch(err){
            next(err);
        }
    }
}

module.exports = asyncWrapper;