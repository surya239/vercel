import pool from "../db.js";
const values = {
    complexScreen:50,
        simpleScreen:120,
        complexDatabase:80,
        simpleDatabase:40,
        complexApi:120,
        simpleApi:60,
        complexReport:70,
        simpleReport:30,
        total: 570
}
const changeWbs = {
    path:'/wbs',
    method:'post',
    handler: async(req, res)=>{
        try {
            const {coloumn, value, id} = req.body;
            let Cvalue = parseInt(value)
            await pool.query(`UPDATE WBS SET ${coloumn} = $1 WHERE  gameid = $2`,[ Cvalue, id])
            const result = await pool.query(`SELECT * FROM WBS where gameid =$1 `,[id])
            const {complexscreen, simplescreen, complexdatabase, simpledatabase, complexapi, simpleapi, complexreport, simplereport} = result.rows[0]
            const total = complexscreen + simplescreen + complexdatabase + simpledatabase + complexapi + simpleapi + complexreport + simplereport
            await pool.query('UPDATE WBS SET total = $1 WHERE gameid = $2', [total,id])
            if(values[coloumn] === Cvalue){
                await pool.query("DELETE from changes where col_name = $1 and gameid = $2",[coloumn, id])
            }
            else{
                const row = await pool.query("SELECT * from changes where col_name = $1 and gameid = $2",[coloumn, id]);
                if(row.rowCount === 0){
                    await pool.query("Insert into changes(col_name, d_value,c_value, gameid) values($1, $2, $3, $4)",[coloumn,values[coloumn], value, id ])
                }
                else{
                    await pool.query("Update changes SET c_value = $1 WHERE gameid = $2",[value,id])
                }
            }
            res.json(total).status(200)
        } catch (error) {
            console.error(error)
        }
    }
}

export default changeWbs