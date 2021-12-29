import express from "express";
// import cookieSession from "cookie-session";

const app = express();

// app.use(cookieSession({ secret: "test secret" }));
// app.use(count);

// function count(req: Express.Request, res: Express.Response) {
//   if (!req.session) return;
//   req.session["count"] = "a";
// }

app.listen(4000);
console.log("express started 🕙 http://localhost:4000");
