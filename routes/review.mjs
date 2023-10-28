import express from "express";
import db from './db.mjs';
const reviewRouter = express.Router();
import ReviewController from "../controllers/reviewController.mjs";

const rController = new ReviewController(db)

reviewRouter.post("/add", rController.addReview.bind(rController));


export default reviewRouter;
