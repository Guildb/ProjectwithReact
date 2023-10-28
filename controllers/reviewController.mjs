import ReviewDao from '../dao/reviewDao.mjs';
import PoiDao from '../dao/poiDao.mjs';

class ReviewController {
    constructor(db) {
        this.revDao = new ReviewDao(db, "poi_reviews");
        this.poiDao = new PoiDao(db, "pointsofinterest");
    }

    addReview(req, res) {
        const id = req.body.poi_id;
        const review = req.body.review;
        try {
            const poi = this.poiDao.getPoiById(id);
            if (poi.lenght == 0) {
                res.status(404).json({ error: "Invalid ID!" });
            } else {
                try{
                const row = this.revDao.add(id, review);
                res.json(row);
                } catch(e){
                    res.status(500).json({ error: e });
                }
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }
}

export default ReviewController;