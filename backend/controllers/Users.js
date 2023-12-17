/* === IMPORT === */
import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            attributes: ['id', 'name', 'email', 'gender'] // show only data in attributers
        }); // find all users model
        res.json(users); // respons json users
    } catch (error) {
        console.log(error)
    }
}

/* === CREATE REGISTER === */
export const Register = async (req, res) => {
    const {name, email, gender, password, confPassword} = req.body; // get data from body

    if(password !== confPassword) return res.status(400).json({msg: "Unmatch password confirmation"}) //check confirmation password

    const salt = await bcrypt.genSalt(); // generate salt form maximum security

    const hashPassword = await bcrypt.hash(password, salt); // hash password

    /* 
    * try and catch for create data
    */
    try {
        await Users.create({
            name: name,
            email: email,
            gender: gender,
            password: hashPassword
        })
        res.json({msg: "Register Successfully"})
    } catch (error) {
        console.log(error);
    }
}

/* === CREATE LOGIN === */
export const Login = async (req, res) => {
    try {
        // find user using email
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user[0].password); // compare password 

        if(!match) return res.status(400).json({msg:"Wrong Password"}); // if password unmatch, send status 400

        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        const gender = user[0].gender;

        /* === CREATE JSON WEB TOKEN === */
        // create access token 
        const accessToken = jwt.sign({userId, name, email, gender}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        })

        // create refresh token 
        const refreshToken = jwt.sign({userId, name, email, gender}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })

        // update refresh token
        await Users.update({refresh_token: refreshToken}, {
            where: {
                id: userId
            }
        })

        // set cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 24 hours (milisecond)
        })

        res.json({ accessToken }); // if login success, server will respons access token as json 
    } catch (error) {
        res.status(404).json({msg:"Unknown Email"}); // if user is not exist, send msg
    }
}

/* === CREATE LOGOUT === */
export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken; // get cookie

    if(!refreshToken) return res.sendStatus(204); // if refreshToken is no exist, send no content

        // search user based on refresh token
        const user = await Users.findAll({
            where: {
                refresh_token: refreshToken
            }
        })

        if(!user[0]) return res.sendStatus(204); // no content if unvalid token

        const userId = user[0].id; // get id

        // update user based on user id
        await Users.update({refresh_token: null}, {
            where: {
                id: userId
            }
        })

        res.clearCookie('refreshToken'); // clear cookie refreshToken

        return res.sendStatus(200); // return status 200
}