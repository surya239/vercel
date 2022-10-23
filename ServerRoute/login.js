import pool from '../db.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jwt = require('jsonwebtoken')
import bcrypt from 'bcrypt';

const login = {
    path:'/api/login',
    method:'post',
    handler: async(req, res) => {
        try {
            const {email, pass} = req.body;
            const log = await pool.query("SELECT * FROM signup WHERE email=$1 ", [email])
            let r = log.rows;
            let re = r.find(ex => ex.email===email)
            if(re === undefined){
                res.sendStatus(202);
            }
            else{
                const a = re.email;
            const corect = await bcrypt.compare(pass, re.pass)
            if(re.email === email && corect )
            {
               jwt.sign({
                   email: email
               },
               process.env.JWT_SECRET,{
                   expiresIn: '5d'
               },
               (err, token) =>{
                   if(err){
                       res.sendStatus(500).send(err)
                   }
                 res.json({token}).status(200);
               }
               ) 
            }
            else{
                res.sendStatus(204)
            }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export default login