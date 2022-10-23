import pool from '../db.js'
const contigency = {
    Insignificant: 0.25,
    Minor: 0.5,
    Significant: 1,
    Major:2,
    Catastrophic:5,
    None:0
}

const contigencyPercentage = ['Insignificant', 'Minor','Significant' ,'Major', 'Catastrophic', 'None']
const getContigency = {
    path:'/contigency/:name/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {name, id} = req.params
            const value = await pool.query(`SELECT riskrating FROM ${name} where gameid = $1`,[id])
            // const sub = await pool.query(`SELECT Subcontractor, cost, rcost from ${name}`)
            // const inhouse = contigency[value.rows[0]['riskrating']]
            // var risk = ''
            // if(sub.rows[0]['subcontractor'] === 'None' || sub.rows[0]['subcontractor'] === 'none'){
            //     risk = 'None'
            // }
            // else{
            //     const Risk = await pool.query(`SELECT ${sub.rows[0]['subcontractor']} FROM riskrating`)
            //     risk = Risk.rows[0][sub.rows[0]['subcontractor']]
            // }
            // const subRisk = contigency[risk]
            // const c = Math.round((sub.rows[0]['rcost'] * inhouse / 100) + (sub.rows[0]['cost'] * subRisk /100))
            // await pool.query(`UPDATE ${name} SET contigency = $1`,[c])
            res.json([contigencyPercentage, value.rows[0]['riskrating'], 0, 0, 0, 0]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getContigency