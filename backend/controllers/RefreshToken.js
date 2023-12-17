/* === IMPORT === */
import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken; // get cookie

        if(!refreshToken) return res.sendStatus(401); // if refreshToken is no exist, send unauthorize

        // search user based on refresh token
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if(!user[0]) return res.sendStatus(403); // forbidden if unvalid token

        // verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const gender = user[0].gender;

            // if verify successfully, create new access token
            const accessToken = jwt.sign({userId, name, email, gender}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            res.json({accessToken})
        })
    } catch (error) {
        console.log(error)
    }
}