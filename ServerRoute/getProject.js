import pool from "../db.js";

const Heuristic = [2,4,6,8,10,12,14,15]
const onshareOffshareRatio = ['1-5', '1-7', '1-10', '1-12']
const onSiteSalary = [4000, 4200, 4400]
const teamRatio = ['1-5', '1-7', '1-10', '1-12']
const teamLeadSalary = [2500, 2600, 2700]
const projectDuration = 5
const teamLeadRatio = ['1-5', '1-7', '1-10', '1-12']
const pmSalary = [3500, 3600, 3700]

const getProject = {
    path:'/getproject/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {id} = req.params
            const result = await pool.query("SELECT * FROM projectmanagement where gameid = $1", [id])
            console.log(result.rows)
            const ratio = String(result.rows[0]['teamleader'])+'-'+String(result.rows[0]['teamemberratio'])
            // console.log(ratio)
            var noOfTeamMembers = 0
            if(ratio === '1-10'){
                noOfTeamMembers = 10
            }
            else if(ratio === '1-5'){
                noOfTeamMembers = 5
            }
            else if(ratio ==='1-7'){
                noOfTeamMembers=7
            }
            else if(ratio ==='1-12'){
                noOfTeamMembers = 12
            }
            else{
                noOfTeamMembers = 0
            }
            const teamratio = String(result.rows[0]['projectmanager'])+'-'+String(result.rows[0]['teamleadratio'])
            let noOfTeamLeadsCount = 0
            if(teamratio === '1-10'){
                noOfTeamLeadsCount = 10
            }
            else if(teamratio === '1-5'){
                noOfTeamLeadsCount = 5
            }
            else if(teamratio === '1-7'){
                noOfTeamLeadsCount=7
            }
            else if(teamratio === '1-12'){
                noOfTeamLeadsCount = 12
            }
            else{
                noOfTeamLeadsCount = 0
            }
            // const resource = await pool.query(`SELECT * from mresource`)
            // // console.log(resource.rows)
            // const maxValue = Math.max(resource.rows[0]['requirement'], resource.rows[0]['design'], resource.rows[0]['coding'], resource.rows[0]['testing'], resource.rows[0]['deployment'])
            // console.log(maxValue)
            // const noOfTeamLeads = maxValue / noOfTeamMembers
            
            // const costOfMonths = Math.round(projectDuration * noOfTeamLeads * result.rows[0]['teamleadsalary'])
            // const noOfManager = noOfTeamLeads / noOfTeamLeadsCount
            // const projectManagerCost = Math.round(projectDuration * noOfManager * result.rows[0]['pmsalary'])
            // const totalresource = await pool.query("SELECT * FROM totalresource")
            // const total = totalresource.rows[0]['requirement'] + totalresource.rows[0]['design'] + totalresource.rows[0]['coding'] + totalresource.rows[0]['deployment'] + totalresource.rows[0]['testing']
            res.json([
                teamRatio,
                ratio, 
                1, 
                1, 
                1,
                teamLeadSalary, 
                result.rows[0]['teamleadsalary'], 
                noOfTeamLeadsCount, 
                teamLeadRatio,
                1,
                1,
                teamratio, 
                pmSalary,
                result.rows[0]['pmsalary'], 
                Heuristic,
                result.rows[0]['heuristic'],
                1,
                onshareOffshareRatio,
                String(result.rows[0]['onsite'])+'-'+String(result.rows[0]['offshore']),
                result.rows[0]['offshore'], 
                0,
                onSiteSalary,
                result.rows[0]['onsitesalary'],
                result.rows[0]['onsitesalary']* projectDuration
            ]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getProject;