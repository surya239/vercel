import pool from "../db.js";

const getResource = {
    path:'/api/getresource/:id',
    method:'get',
    handler: async(req, res) => {
        try{
            const {id} = req.params
            const result = await pool.query("SELECT * FROM resourceValues")
        const lifeCycle = await pool.query("SELECT lifecycle from resource where gameid = $1",[id])
        const resource = await pool.query("SELECT * FROM resource where gameid = $1",[id])
        let Month = {
            resource:'',
            design:'',
            coding:'',
            testing:'',
            deployment:'',
            total:'',
        }
        
            if(lifeCycle.rows[0].lifecycle === '20,20,20,20,20'){
                Month = {
                    resource:20,
                    design:20,
                    coding:20,
                    testing:20,
                    deployment:20,
                    
                }
            }
            else if(lifeCycle.rows[0].lifecycle === '10,15,40,25,10'){
                Month = {
                    resource:10,
                    design:15,
                    coding:40,
                    testing:25,
                    deployment:15,
                
                }
            }
            else{
                Month = {
                    resource:5,
                    design:30,
                    coding:30,
                    testing:30,
                    deployment:5,
                }            
        }
        Month.total = Month.coding + Month.deployment + Month.design +Month.resource + Month.testing
        const query = await pool.query("UPDATE resource SET requirement = $1, design = $2, coding = $3, testing = $4, deployment = $5, total = $6",[Month.resource, Month.design, Month.coding, Month.testing, Month.deployment, Month.total])

        res.json([result.rows, Month, resource.rows]).status(200)
    } catch (error) {
        console.log(error)
    }
    }
}

export default getResource