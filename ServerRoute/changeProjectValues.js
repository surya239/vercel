import pool from "../db.js";

const changeProjectValues = {
    path:'/changeprojectvalues',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value, c1, id} = req.body
            console.log(req.body)
            const result = await pool.query(`UPDATE projectmanagement SET ${c1} = $1 where gameid = $2`,[value, id])
           
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeProjectValues