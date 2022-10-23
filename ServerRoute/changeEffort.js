import pool from "../db.js";
const estimation = 60
const c = 'Estimation accuracy level'
const changeEffort = {
    path:'/changeeffort',
    method:'post',
    handler: async(req, res) => {
        try {
            const {id, value} = req.body;
            const result = await pool.query("Update effort set effortpercentage = $1 where gameid = $2",[value, id])
            if(value === estimation){
                await pool.query("DELETE FROM changes where col_name = $1 and gameid = $2",[c, id])
            }
            else{
                const row = await pool.query("SELECT * from changes where col_name = $1 and gameid = $2",[c, id]);
                if(row.rowCount === 0){
                    await pool.query("Insert into changes(col_name, d_value,c_value, gameid) values($1, $2, $3, $4)",[c,estimation, value, id ])
                }
                else{
                    await pool.query("Update changes SET c_value = $1 WHERE gameid = $2",[value,id])
                }
            }
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeEffort