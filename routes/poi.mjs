import express from "express";
import db from './db.mjs';
const poiRouter = express.Router();
import PoiController from "../controllers/poiController.mjs";

const pController = new PoiController(db)

poiRouter.get("/search/:region", pController.search.bind(pController) );

poiRouter.post("/add", pController.add.bind(pController));

poiRouter.post("/recommend", pController.recommend.bind(pController));


export default poiRouter;
