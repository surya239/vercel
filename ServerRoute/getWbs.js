import pool from '../db.js'

const wbs = {
    path:'/tablevalues/:table/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {table, id} = req.params
            console.log(req.params)
            const result = await pool.query(`SELECT * FROM wbs WHERE gameid = $1`,[id])
            console.log(result.rows)
            res.json( result.rows[0]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default wbs