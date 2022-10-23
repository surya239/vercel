import signup from "./Signup.js";
import login from "./login.js";
import createGame from "./createGame.js";
import wbs from "./getWbs.js";
import changeWbs from "./changeWbs.js";
import games from "./getGames.js";
import adjust from "./adjust.js";
import changeEffort from "./changeEffort.js";
import getProductivity from "./getProductivity.js";
import changeProductivity from "./changeProductivity.js";
import getResource from "./getResource.js";
import changeResource from "./changeReource.js";
import getRessourceCost from "./getResourceCost.js";
import changeResourceCost from "./changeResourceCost.js";
import getProject from "./getProject.js";
import changeProject from "./changeProject.js";
import changeProjectValues from "./changeProjectValues.js";
import getSub from "./getSubCon.js";
import changeSubcon from "./changeSubcon.js";
import getContigency from "./getContigency.js";
import changeContigency from "./changeContigency.js";
import getInfra from "./getInfra.js";
import changeInfra from "./changeInfra.js";
import getFinance from "./getFinance.js";
import changeFinance from "./changeFinance.js";
import getSummary from "./getSummary.js";
import changeSummary from "./changeSummary.js";
import getBidPrice from "./getBidPrice.js";
import getChange from "./getchanges.js";
const routes = [
    signup,
    changeFinance,
    login,
    createGame,
    wbs,
    changeWbs,
    games,
    adjust,
    changeEffort,
    getProductivity,
    changeProductivity,
    getResource,
    changeResource,
    getRessourceCost,
    changeResourceCost,
    getProject,
    changeProject,
    changeProjectValues,
    getSub,
    changeSubcon,
    getContigency,
    changeContigency,
    getInfra,
    changeInfra,
    getFinance,
    getSummary,
    changeSummary,
    getBidPrice,
    getChange
]

export default routes;