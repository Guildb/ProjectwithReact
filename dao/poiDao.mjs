class PoiDao {

    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    add(name, type, country, region, lon, lat, desc) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table} (name, type, country, region, lon, lat, description, recommendations) VALUES(?,?,?,?,?,?,?,0)`);
        const rows = stmt.run(name, type, country, region, lon, lat, desc);
        return rows.lastInsertRowid;
    }

    search(region) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE region=?`);
        const results = stmt.all(region);
        return results;
    }

    recommend(id) {
        const stmt = this.db.prepare(`UPDATE ${this.table} SET recommendations=recommendations+1 WHERE id=?`);
        const results = stmt.run(id);
        return results;
    }

    getPoiById(id) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE id=?`);
        const results = stmt.all(id);
        return results;
    }


}

export default PoiDao;