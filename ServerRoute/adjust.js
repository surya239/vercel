import pool from "../db.js";

const adjust = {
    path:'/adjust/:id',
    method:'get',
    handler: async(req, res) =>{
        try {
            console.log(req.params)
            const {id} = req.params
            const result1 = await pool.query("SELECT * FROM adjust")
            const result2 = await pool.query("SELECT * from effort where gameid = $1",[id])
            const result = [result1.rows, result2.rows]
            res.json(result).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default adjust