import express from "express";
import Database from "better-sqlite3";
import expressSession from "express-session";
import betterSqlite3Session from "express-session-better-sqlite3";

import poiRouter from "./routes/poi.mjs";
import reviewRouter from "./routes/review.mjs";
import userRouter from "./routes/user.mjs";
import userMiddleWare from "./routes/middleware.mjs";


const app = express();
const sessDb = new Database(".\\db\\session.db");
const SqliteStore = betterSqlite3Session(expressSession, sessDb);
app.use(express.json());
app.use(express.static("public"));


app.use(
  expressSession({
    store: new SqliteStore(),
    secret: "secretforae1",
    resave: true,
    saveUnitialized: false,
    rolling: true,
    unset: "destroy",
    proxy: true,
    cookie: {
      maxAge: 600000,
      httpOnly: false,
    },
  })
);


app.post('/poi/add', userMiddleWare);
app.use('/poi', poiRouter);
app.use('/user', userRouter);
app.use('/review', userMiddleWare);
app.use('/review', reviewRouter);

app.listen(3000);
