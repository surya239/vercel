import pool from '../db.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt';

const signup = {
    path:'/api/signup',
    method:'post',
    handler: async(req, res) => {
        try{
        let r;
        const { email, pass } = req.body;
        const hashPass = await bcrypt.hash(pass,10)
        const signup = await pool.query("INSERT INTO signup( email, pass) values($1, $2)", [ email, hashPass] );
        jwt.sign({
            email: email
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if(err){
                console.log("Hi")
                return res.status(500).send(err)
            }
            r = {token}
           res.status(200).json({token})
        }
        )
    } catch (err) {
        console.log(err)
        res.status(202).json('Username or email already exist')
    }
    }
}

export default signup