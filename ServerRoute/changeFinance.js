import pool from "../db.js";

const changeFinance = {
    path:'/changecostofcapital',
    method:'post',
    handler: async(req, res) => {
        try {
            const {value, id} = req.body
            console.log("hi")
            await pool.query(`UPDATE finance SET costofcapital = $1 where gameid = $2`,[value,id])
            res.sendStatus(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default changeFinance;