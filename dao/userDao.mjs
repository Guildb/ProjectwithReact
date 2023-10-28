class UserDao {

    constructor(db, table) {
        this.db = db;
        this.table = table;
    }

    login(username, password) {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE username=? AND password=?`);
        const results = stmt.all(username, password);
        return results
    }

}

export default UserDao;