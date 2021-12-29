import cookieSession from "cookie-session";
import express, { Request, Response } from "express";

const app = express();

app.use(cookieSession({ secret: "test secret" }));
app.use(count);

function count(req: Request, res: Response) {
  console.log(req.session);
  if (!req.session) return;
  req.session.count = (req.session.count || 0) + 1;
  res.send("viewed " + req.session.count + " times\n");
}

app.listen(4000);
console.log("express started 🕙 http://localhost:4000");
