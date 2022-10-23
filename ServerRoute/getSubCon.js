import pool from "../db.js";
const selectSubCon = ['none', 'subCon - 1', 'subCon - 2', 'subCon - 3']
const getSub = 
{
    path:'/selectsubcon/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {id} = req.params
            const coding = await pool.query("SELECT subcontractor from coding where gameid = $1", [id])
            const design = await pool.query("SELECT subcontractor from design where gameid = $1", [id])
            const testing = await pool.query("SELECT subcontractor from testing where gameid = $1", [id])
            const deployment = await pool.query("SELECT subcontractor from deployment where gameid = $1", [id])
            console.log(design.rows)
            res.json([
                selectSubCon,
                design.rows[0]['subcontractor'],
                coding.rows[0]['subcontractor'],
                testing.rows[0]['subcontractor'],
                deployment.rows[0]['subcontractor']
              ]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getSub;