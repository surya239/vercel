import pool from "../db.js";

const changeSubcon = {
    path:'/changesub',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value, c1, id} = req.body
            let val = ''
            if(value === 'none'){
                val = 'none'
            }
            else if(value === 'subCon - 1'){
                val = 'sub1'
            }
            else if(value === 'subCon - 2'){
                val = 'sub2'
            }
            else if(value === 'subCon - 3'){
                val = 'sub3'
            }
            console.log(val)
            const result = await pool.query(`UPDATE ${c1} SET subcontractor = $1 where gameid = $2`, [val, id])
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeSubcon