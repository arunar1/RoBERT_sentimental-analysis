const express = require("express");
const cors = require("cors");
const { sentiment } = require("./modules/sentiment");


const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

// app.use(
//   cors({
//     origin: "*", 
//   })
// );

app.listen(4000, () => console.log("App is running http://localhost:4000"));


app.post("/api/sentiment", (req, res) => {
  console.log(req)
  const data = req.body.data;

  const calculatedsentiment = sentiment(data);

  return res.send({ calculatedsentiment });
});


