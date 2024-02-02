const express = require("express");
const cors = require("cors");
const { sentiment } = require("./modules/sentiment");
const dotenv = require('dotenv');
dotenv.config();


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

app.listen(4000, () => console.log("App is running http://localhost:4000"));

app.post("/api/sentiment", async (req, res) => {
  try {
    const data = req.body.data;
    console.log(data);

    const calculatedsentiment = await sentiment(data);
    console.log(calculatedsentiment);

    return res.send({ calculatedsentiment });
  } catch (error) {
    console.error("Error processing sentiment:", error.message);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});
