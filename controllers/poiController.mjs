import PoiDao from '../dao/poiDao.mjs';

class PoiController {
    constructor(db) {
        this.dao = new PoiDao(db, "pointsofinterest");
    }

    add(req, res) {
        try {
            const name = req.body.name;
            const type = req.body.type;
            const country = req.body.country;
            const region = req.body.region;
            const lon = req.body.lon;
            const lat = req.body.lat;
            const desc = req.body.desc;
            
            const data = this.dao.add(name, type, country, region, lon, lat, desc);
            res.json({id: data});
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    search(req, res) {
        try {
            const data = this.dao.search(req.params.region);
            res.json(data);
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    recommend(req, res) {
        try {
            const rec = this.dao.recommend(req.body.poi_id);
            if (rec.changes == 0) {
                res.status(404).json({ error: "No POI with that ID" });
            } else {
                res.json(rec);
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

}

export default PoiController;