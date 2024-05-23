import Express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./Routes/userRoutes.js";
import { PollRoute } from "./Routes/pollRoutes.js";
import { VoteRoute } from "./Routes/voteRoutes.js";

const app = Express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Regular Middlewares
app.use(Express.json({ limit: "20kb" }));
app.use(urlencoded({ extended: true, limit: "20kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from sever");
});

//Routes
app.use("/user", userRoute);
app.use("/poll", PollRoute);
app.use("/vote", VoteRoute);

export default app;
