import pool from "../db.js";
let L = ['100-0', '80-20', '70-30', '50-50', '30-70', '20-80'];
let x = [1800, 1900, 2000]
let y = [1200, 1300, 1400]
const getRessourceCost = {
    path:'/resourcecostvalues/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {id} = req.params
            const result = await pool.query("SELECT * from resourcecost where gameid = $1 ",[id]);
            res.json([L,x,y, result.rows]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getRessourceCost