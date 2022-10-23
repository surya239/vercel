import pool from "../db.js";

const changeProject = {
    path:'/changeproject',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value1, value2, c1, c2, id} = req.body
            console.log(req.params)
     
            const response = await pool.query(`UPDATE projectmanagement SET ${c1} = $1, ${c2} = $2 where gameid = $3`,[value1, value2, id])
            res.sendStatus(200)
         } catch (error) {
             console.log(error)
         }
    }
}

export default changeProject;