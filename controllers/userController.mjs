import UserDao from '../dao/userDao.mjs';

class UserController {

    constructor(db) {
        this.dao = new UserDao(db, "poi_users");
    }

    loguinUser(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = this.dao.login(username, password);
            if (user.lenght == 0) {
                res.status(404).json({ error: "Invalid details!" });
            } else {
                req.session.username = username;
                res.json(user);
            }
        } catch (e) {
            res.status(500).json({ error: e });
        }
    }

    logout(req, res) {
        req.session = null;
        res.json({ success: 1 });
    }


    verifyLoguin(req, res) {
        res.json({ username: req.session.username || null });
    }
}

export default UserController;