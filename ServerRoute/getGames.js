import pool from "../db.js";

const games = {
    path:'/api/getgames/:email',
    method:"get",
    handler:async(req, res) => {
        try {
            const {email} = req.params
            const result = await pool.query("SELECT * from games WHERE email = $1",[email])
            console.log(result.rows)
            res.json(result.rows).status(200)
        } catch (error) {
            
        }
    }
}

export default games