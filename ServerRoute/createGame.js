import pool from "../db.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const createGame = {
    path:'/api/creategame',
    method:'post',
    handler: async(req, res) => {
        try {
            const {email} = req.body
            const id = (new Date().getTime().toString()) + email
            const create = await pool.query("Insert into games(gameid, email) values($1, $2)",[id, email])
            const insertwbs = await pool.query("Insert into wbs(gameid) values($1)",[id])
            const insertEffort = await pool.query("Insert into effort(gameid) values($1)",[id])
            const insertcomplex = await pool.query("Insert into complexscreen(gameid) values($1)",[id])
            const insertSimpleScreen = await pool.query("Insert into simplescreen(gameid) values($1)",[id])
            const insertComplexApi = await pool.query("Insert into complexapi(gameid) values($1)",[id])
            const insertSimpleApi = await pool.query("Insert into simpleapi(gameid) values($1)",[id]);
            const insertComplexReport = await pool.query("Insert into complexreport(gameid) values($1)",[id]);
            const insertsimpleReport = await pool.query("Insert into simplereport(gameid) values($1)",[id]);
            const insertComplexDatabase = await pool.query("Insert into complexdatabase(gameid) values($1)",[id]);
            const insertSimpleDatabase = await pool.query("Insert into simpledatabase(gameid) values($1)",[id]);
            const inserResource = await pool.query("Insert into resource(gameid) values($1)",[id])
            const insertResourceCost = await pool.query("Insert into resourcecost(gameid) values($1)",[id])
            const insertProjectManagement = await pool.query("Insert into projectmanagement(gameid) values($1)",[id])
            const insertDesign = await pool.query("Insert into design(gameid) values($1)",[id])
            const insertCoding = await pool.query("Insert into coding(gameid) values($1)",[id])
            const inserttesting = await pool.query("Insert into testing(gameid) values($1)",[id])
            const insertDeployment = await pool.query("Insert into deployment(gameid) values($1)",[id]);
            const insertRequirement = await pool.query("Insert into requirement(gameid) values($1)",[id])
            const insertFinance = await pool.query("Insert into finance(gameid) values($1)",[id]);
            const insertbidsummary = await pool.query("Insert into bidsummary(gameid) values($1)",[id]);
            const insertInfra = await pool.query("Insert into infra(gameid) values($1)",[id]);
            res.json({id:id}).status(200)
        } catch (error) {
            console.log(error)
        }
    }
}

export default createGame;