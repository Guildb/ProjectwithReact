import Database from 'better-sqlite3';
const db = new Database(".\\db\\pointsofinterest.db");
export default db;