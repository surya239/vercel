import pool from "../db.js";

const changeSummary = {
    path:'/changebidsummary',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value, column, id} = req.body
            const val = parseInt(value)
            const result = await pool.query(`UPDATE bidsummary SET ${column} = $1 where gameid = $2`, [val, id])
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeSummary