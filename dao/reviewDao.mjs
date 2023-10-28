class ReviewDao {

    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    add(id, review) {
        const stmt = this.db.prepare(`INSERT INTO ${this.table} (poi_id, review) VALUES(?,?)`);
        const rows = stmt.run(id, review);
        return rows.lastInsertRowid;
    }
}

export default ReviewDao; 