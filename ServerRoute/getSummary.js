import pool from "../db.js";
const contigencyCost = {
    Insignificant:0.25,
    Minor:0.5,
    Significant:1,
    Major:2,
    Catastrophic:5,
    None:0,
    none:0
}

const Infra = [500, 600, 700]
const costOfCapital = [7, 8, 9, 10,12,14,18,22]
const overHead = [2,3,4]
const expectedProfit = [5, 10, 15, 20, 25,30,35]
const getSummary = {
    path:'/summary/:id',
    method:'get',
    handler: async(req, res) => {
        try {
            const {id} = req.params
            const wbs = await pool.query(`SELECT * from wbs where gameid = $1`,[id])
            const accuracy = await pool.query(`SELECT * from effort where gameid = $1`,[id])
            const pcs = await pool.query(`Select productivity from complexscreen where gameid = $1`,[id])
            const pss = await pool.query(`Select productivity from simplescreen where gameid = $1`,[id])
            const pcd = await pool.query(`select productivity from complexdatabase where gameid = $1`,[id])
            const psd = await pool.query(`Select productivity from simpledatabase where gameid = $1`,[id])
            const pca = await pool.query(`select productivity from complexapi where gameid = $1`,[id])
            const psa = await pool.query(`select productivity from simpleapi where gameid = $1`,[id])
            const pcr = await pool.query(`select productivity from complexreport where gameid = $1`,[id])
            const psr = await pool.query(`select productivity from simplereport where gameid = $1`,[id])
            const ucs = await pool.query(`select ${pcs.rows[0]['productivity']} from complexscreen where gameid = $1`,[id])
            const uss = await pool.query(`select ${pss.rows[0]['productivity']} from simplescreen where gameid = $1`,[id])
            const ucd = await pool.query(`select ${pcd.rows[0]['productivity']} from complexdatabase where gameid = $1`,[id])
            const usd = await pool.query(`select ${psd.rows[0]['productivity']} from simpledatabase where gameid = $1`,[id])
            const uca = await pool.query(`select ${pca.rows[0]['productivity']} from complexapi where gameid = $1`,[id])
            const usa = await pool.query(`select ${psa.rows[0]['productivity']} from simpleapi where gameid = $1`,[id])
            const ucr = await pool.query(`select ${pcr.rows[0]['productivity']} from complexreport where gameid = $1`,[id])
            const usr = await pool.query(`select ${psr.rows[0]['productivity']} from simplereport where gameid = $1`,[id])
            const estimation = accuracy.rows[0]['effortpercentage'] / 100
            const Screen = (ucs.rows[0][pcs.rows[0]['productivity']] * wbs.rows[0]['complexscreen'] ) / (estimation) + (uss.rows[0][pss.rows[0]['productivity']] * wbs.rows[0]['simplescreen'] ) / (estimation)
            const Database = (ucd.rows[0][pcd.rows[0]['productivity']] * wbs.rows[0]['complexdatabase'] ) / (estimation) + (usd.rows[0][psd.rows[0]['productivity']] * wbs.rows[0]['simpledatabase'] ) / (estimation)
            const Api = (uca.rows[0][pca.rows[0]['productivity']] * wbs.rows[0]['complexapi'] ) / (estimation) + (usa.rows[0][psa.rows[0]['productivity']] * wbs.rows[0]['simpleapi'] ) / (estimation)
            const Report = (ucr.rows[0][pcr.rows[0]['productivity']] * wbs.rows[0]['complexreport'] ) / (estimation) + (usr.rows[0][psr.rows[0]['productivity']] * wbs.rows[0]['simplereport'] ) / (estimation)
            const resource = await pool.query(`SELECT * from resource where gameid = $1`,[id])
            const Module1 = Screen / (resource.rows[0]['workingday'] * resource.rows[0]['phperday'])
            const Module2 = Database / (resource.rows[0]['workingday'] * resource.rows[0]['phperday'])
            const Module3 = Api / (resource.rows[0]['workingday'] * resource.rows[0]['phperday'])
            const Module4 = Report / (resource.rows[0]['workingday'] * resource.rows[0]['phperday'])
            const requirement = Module1 * (resource.rows[0]['requirement'] / 100) + Module2 * (resource.rows[0]['requirement'] / 100) + Module3 * (resource.rows[0]['requirement'] / 100) + Module4 * (resource.rows[0]['requirement'] / 100)
            const Design = Module1 * (resource.rows[0]['design'] / 100) + Module2 * (resource.rows[0]['design'] / 100) + Module3 * (resource.rows[0]['design'] / 100) + Module4 * (resource.rows[0]['design'] / 100)
            const coding = Module1 * (resource.rows[0]['coding'] / 100) + Module2 * (resource.rows[0]['coding'] / 100) + Module3 * (resource.rows[0]['coding'] / 100) + Module4 * (resource.rows[0]['coding'] / 100)
            const testing = Module1 * (resource.rows[0]['testing'] / 100) + Module2 * (resource.rows[0]['testing'] / 100) + Module3 * (resource.rows[0]['testing'] / 100) + Module4 * (resource.rows[0]['testing'] / 100)
            const deployment = Module1 * (resource.rows[0]['deployment'] / 100) + Module2 * (resource.rows[0]['deployment'] / 100) + Module3 * (resource.rows[0]['deployment'] / 100) + Module4 * (resource.rows[0]['deployment'] / 100)
            const r = await pool.query("SELECT * FROM requirement where gameid = $1",[id])
            const d = await pool.query("SELECT * FROM design where gameid = $1",[id])
            const c = await pool.query("SELECT * FROM coding where gameid = $1",[id])
            const t = await pool.query("SELECT * from testing where gameid = $1",[id])
            const de = await pool.query("SELECT * FROM deployment where gameid = $1",[id])
            const project = (await pool.query(`SELECT * from projectmanagement where gameid = $1`,[id])).rows[0]
           
            const salary = await pool.query("SELECT * from resourcecost where gameid = $1",[id])
            const maxValue = Math.max(requirement, Design, coding, testing, deployment)
            const onsite = Math.round(5 * maxValue/project.offshore * project.onsitesalary)
            const totalProject = Math.round((maxValue/project.teamemberratio * 5 * project.teamleadsalary) + ( maxValue/project.teamemberratio/ project.teamleadratio * 5 * project.pmsalary))
    
            
            const p =salary.rows[0]['permenentsalary']
            console.log(p)
            const temp = salary.rows[0]['temporarysalary']
            const permenent = {
                requirement: Math.round((requirement * salary.rows[0]['permenent'] / 100) * p +  (requirement * salary.rows[0]['temporaryload'] / 100) * temp),
                design: Math.round(Design * salary.rows[0]['permenent'] / 100 * p+ (Design * salary.rows[0]['temporaryload'] / 100) * temp),
                coding: Math.round(coding * salary.rows[0]['permenent'] / 100 * p + (coding * salary.rows[0]['temporaryload'] / 100) * temp),
                testing: Math.round(testing * salary.rows[0]['permenent'] / 100 * p + (testing * salary.rows[0]['temporaryload'] / 100) * temp),
                deployment: Math.round(deployment * salary.rows[0]['permenent'] /100 * p + (deployment * salary.rows[0]['temporaryload'] / 100) * temp)
            }
            const sub1 = {
                design: Math.round(p * Design* (1 +(d.rows[0]['sub1']/100))),
                coding: Math.round(p * Design*  (1 +(c.rows[0]['sub1']/100))),
                testing: Math.round(p * Design*  (1 +(t.rows[0]['sub1']/100))),
                deployment: Math.round(p * Design* (1 +(de.rows[0]['sub1']/100))),
            }
            const sub2 = {
                design: Math.round(p * Design* (1 +(d.rows[0]['sub2']/100))),
                coding: Math.round(p * Design*  (1 +(c.rows[0]['sub2']/100))),
                testing: Math.round(p * Design*  (1 +(t.rows[0]['sub2']/100))),
                deployment: Math.round(p * Design* (1 +(de.rows[0]['sub2']/100))),
            }
            const sub3 = {
                design: Math.round(p * Design* (1 +(d.rows[0]['sub3']/100))),
                coding: Math.round(p * Design*  (1 +(c.rows[0]['sub3']/100))),
                testing: Math.round(p * Design*  (1 +(t.rows[0]['sub3']/100))),
                deployment: Math.round(p * Design* (1 +(de.rows[0]['sub3']/100))),
            }
            const subcost = {
                requirement: 0,
                design: d.rows[0]['subcontractor'] === 'none' ? 0: d.rows[0]['subcontractor'] === 'sub1' ? sub1.design : d.rows[0]['subcontractor'] === 'sub2'?sub2.design : sub3.design,
                coding: c.rows[0]['subcontractor'] === 'none' ? 0: c.rows[0]['subcontractor'] === 'sub1' ? sub1.coding : c.rows[0]['subcontractor'] === 'sub2'?sub2.coding : sub3.coding,
                testing: t.rows[0]['subcontractor'] === 'none' ? 0: t.rows[0]['subcontractor'] === 'sub1' ? sub1.testing : d.rows[0]['subcontractor'] === 'sub2'?sub2.testing : sub3.testing,
                deployment: de.rows[0]['subcontractor'] === 'none' ? 0: de.rows[0]['subcontractor'] === 'sub1' ? sub1.deployment : de.rows[0]['subcontractor'] === 'sub2'?sub2.deployment : sub3.deployment
            }
            const rcost = {
                requirement: subcost.requirement === 0? permenent.requirement : 0,
                design: subcost.design === 0 ? permenent.design : 0,
                coding: subcost.coding === 0 ? permenent.coding : 0,
                testing: subcost.testing === 0 ? permenent.testing : 0,
                deployment: subcost.deployment === 0 ? permenent.deployment : 0
            }
            const noOftotalcost = {
                requirement: subcost.requirement === 0 ? requirement * salary.rows[0]['permenent'] / 100 + requirement * salary.rows[0]['temporaryload'] / 100 : 0,
                design: subcost.design === 0 ? Design * salary.rows[0]['permenent'] / 100 + Design * salary.rows[0]['temporaryload'] / 100 : 0,
                coding: subcost.coding === 0 ? coding * salary.rows[0]['permenent'] / 100 + coding * salary.rows[0]['temporaryload'] / 100 : 0,
                testing: subcost.testing === 0 ? testing * salary.rows[0]['permenent'] / 100 + testing * salary.rows[0]['temporaryload'] / 100 : 0,
                deployment: subcost.deployment === 0 ? deployment * salary.rows[0]['permenent'] / 100 + deployment * salary.rows[0]['temporaryload'] / 100 : 0,
            }
            const inhouse = {
                requirement: contigencyCost[r.rows[0]['riskrating']],
                design:contigencyCost[d.rows[0]['riskrating']],
                coding:contigencyCost[c.rows[0]['riskrating']],
                testing:contigencyCost[t.rows[0]['riskrating']],
                deployment:contigencyCost[de.rows[0]['riskrating']]
            }
            const riskValue = await (await pool.query('SELECT * from riskrating')).rows[0]
            const subRisk = {
                requirement: contigencyCost[r.rows[0]['subcontractor']],
                design:contigencyCost[riskValue[d.rows[0]['subcontractor']]],
                coding:contigencyCost[riskValue[c.rows[0]['subcontractor']]],
                testing:contigencyCost[riskValue[t.rows[0]['subcontractor']]],
                deployment:contigencyCost[riskValue[de.rows[0]['subcontractor']]]
            }
         
            const contigency = {
                requirement:rcost.requirement * inhouse.requirement / 100 + subcost.requirement * subRisk.requirement /100,
                design: rcost.design * inhouse.design / 100 + subcost.design * subRisk.design/100,
                coding:rcost.coding * inhouse.coding / 100 + subcost.coding * subRisk.coding /100,
                testing: rcost.testing * inhouse.testing / 100 + subcost.testing * subRisk.testing /100,
                deployment: rcost.deployment * inhouse.deployment / 100 + subcost.deployment * subRisk.deployment /100
            }
            console.log(rcost, subcost, subRisk, inhouse)
            const {overhead, expectedprofit} = (await pool.query('SELECT * from bidsummary where gameid = $1',[id])).rows[0]
            
            const totalCotigency = Math.round(contigency.requirement + contigency.design + contigency.coding + contigency.testing + contigency.deployment)
    
            const totalSubContractRisk = rcost.requirement + rcost.design + rcost.coding + rcost.testing + rcost.deployment
            const totalSubCost = subcost.requirement + subcost.design + subcost.coding +  subcost.testing + subcost.deployment
            const totalNoOfCOST = noOftotalcost.requirement + noOftotalcost.design + noOftotalcost.coding + noOftotalcost.testing + noOftotalcost.deployment
           
             
            const {cost} = (await pool.query(`SELECT cost from infra where gameid = $1`,[id])).rows[0]
            const infra = Math.round(totalNoOfCOST * cost)
        //    console.log(totalSubCost , totalSubContractRisk ,infra , totalCotigency , onsite ,totalProject)
            const overHeadCost = (totalSubCost + totalSubContractRisk + infra + totalCotigency + onsite + totalProject) * overhead / 100
            const profit = ((totalSubCost + totalSubContractRisk + infra + totalCotigency + onsite + totalProject+overHeadCost + 11121 ) / (1 - expectedprofit /100)) - (totalSubCost + totalSubContractRisk + infra + totalCotigency + onsite + totalProject+overHeadCost + 11121)
            const bitPrice = overHeadCost + totalSubCost + totalSubContractRisk + infra + totalCotigency + onsite + totalProject +profit + 11121
            res.json([overHead, expectedProfit, overhead, expectedprofit, totalSubContractRisk, totalSubCost, infra,onsite, totalCotigency, totalProject,overHeadCost,11121, profit, bitPrice]).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default getSummary