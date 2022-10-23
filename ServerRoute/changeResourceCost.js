import pool from "../db.js";

const changeResourceCost = {
    path:'/changeresourcecost',
    method:'post',
    handler: async(req, res) => {
        try {
            const {coloumn, label, id} = req.body
    
            if(coloumn === 'pvst'){
                const value = label.split('-')
                console.log(value)
                const result = await pool.query("UPDATE resourcecost SET permenent = $1, temporaryload = $2 where gemeid = $3",[value[0], value[1], id])
            }
            else{
                await pool.query(`UPDATE resourcecost SET  ${coloumn} = $1 where gameid = $2 `, [label, id])
            }
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeResourceCost