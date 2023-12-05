const express = require("express");
const app = express();
// debouncing javascript class generator function
const authRouter = require("./router/authRouter");
const newsRouter = require("./router/newsRouter");

require("dotenv").config();

const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).json({ msg: "This is the home page" });
});

/****
 * This is middle for registration and login
 *
 */
app.use("/auth", authRouter);

/****
 * This is middle for news items
 *
 */
app.use("/api", newsRouter);

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
