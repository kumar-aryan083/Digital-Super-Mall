import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.json({
                success: false,
                message: 'token not found, login to access this page'
            })
        }else{
            jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
                if(err){
                    return next(res.json({
                        success: false,
                        message: 'invalid token'
                    }))
                }else{
                    req.user = user;
                    next();
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}