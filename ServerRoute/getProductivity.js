import pool from "../db.js";

const getProductivity = {
    path:'/productivity/:name/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {name, id} = req.params
            const p = await pool.query("SELECT * FROM productivity")
            const pr = await pool.query(`SELECT productivity from ${name} where gameid = $1`,[id])
            const unit = await pool.query(`SELECT ${pr.rows[0]['productivity']} from ${name} where gameid = $1`,[id])
            const wbs = await pool.query(`SELECT ${name} from wbs where gameid = $1`,[id])
            const {effortpercentage} = (await pool.query(`select effortpercentage from effort where gameid = $1`,[id])).rows[0]
            const effort = Math.round(wbs.rows[0][name] * unit.rows[0][pr.rows[0]['productivity']] / (effortpercentage /100))
            res.json([p.rows, pr.rows[0]['productivity'], effort]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getProductivity