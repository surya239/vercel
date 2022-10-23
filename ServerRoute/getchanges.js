import pool from '../db.js'

const getChange = {
    path:'/getChanges/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {id} = req.params
            console.log(req.params)
            const result = await pool.query("SELECT * FROM changes");
            console.log(result.rows)
            res.json(result.rows);
        } catch (error) {
            console.log(error)
        }
    }
}

export default getChange