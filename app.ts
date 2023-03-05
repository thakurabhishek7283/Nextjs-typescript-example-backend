import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoute from "./routes/auth";
import contactRoute from "./routes/contacts";

const app: Express = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/auth", authRoute);
app.use("/contacts", contactRoute);

const database_url = process.env.DB_URL as string;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(database_url);
  console.log("Database Connected");
}

app.get("/", (req: Request, res: Response) => {
  res.json({ page: "homepage" });
});
app.get("*", (req, res) => {
  res.send("PAGE NOT FOUND");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
