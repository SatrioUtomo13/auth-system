/* === IMPORT === */
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']; // request headers

    const token = authHeader && authHeader.split(' ')[1]; // if header exist, split

    if(token == null) return res.sendStatus(401); // if token null, send status unauthorized

    /* 
    * verifiy token
    * validate token with secret key
    * if error, send 403 forbidden
    * if token valid, fill req.email with decode email
    */
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.email = decoded.email;
        next();
    })
}