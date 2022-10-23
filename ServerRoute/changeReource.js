import pool from "../db.js";
const lifecycle = '20,20,20,20,20'
const Wd = 22
const phd = 6
const changeResource = {
    path: '/changeresource',
    method:'post',
    handler: async(req, res) => {
        try {
            const {table, value, id} = req.body
            let val;
            const col_name = () => {
                if(table === 'lifecycle'){
                    val = '20,20,20,20,20'
                    return 'Life Cycle'
                }
                else if(table === 'workingday'){
                    val = 22
                    return 'Working days per Months'
                }
                else if(table === 'phperday'){
                    val = 6
                    return 'Productive hours per day'
                }
            }
            const column = col_name()
            console.log(column)
            const result = await pool.query(`UPDATE resource SET ${table} = $1 where gameid = $2`,[value, id])
            if(value === val){
                await pool.query("DELETE FROM changes where col_name = $1 and gameid = $2",[column, id])
            }
            else{
                const row = await pool.query("SELECT * from changes where col_name = $1 and gameid = $2",[column, id]);
                if(row.rowCount === 0){
                    await pool.query("Insert into changes(col_name, d_value,c_value, gameid) values($1, $2, $3, $4)",[column,val, value, id ])
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

export default changeResource