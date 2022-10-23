import pool from "../db.js";

const changeContigency = {
    path:'/changecontigency',
    method:'post',
    handler: async(req, res) => {
        try {
            const {name, label, id} = req.body
            const result = await pool.query(`UPDATE ${name} SET riskrating = $1 where gameid = $2`,[label, id])
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeContigency