const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const cors = require('cors');
const mainRouter = require("./routes/index");
const bodyParser = require("body-parser");
const app = express();

dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);

app.use("/api/v1", mainRouter);

// router.get("/something", async (req, res) => {
//     res.status(200).json("something")
// })

app.listen(process.env.PORT, () => { console.log(`server listening on port ${process.env.PORT}`) });

module.exports = app;