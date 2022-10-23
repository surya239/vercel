import pool from "../db.js";

const changeInfra = {
    path:'/infrachange',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value, c, id} = req.body;
            console.log(value)
            await pool.query(`UPDATE infra SET cost = $1 where gameid = $2`,[value, id])
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeInfra;