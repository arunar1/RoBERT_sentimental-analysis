const dotenv = require('dotenv');
dotenv.config();


const sentiment=(data)=>{
    async function query(data) {
        const response = await fetch(
          "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment-latest",
          {
            headers: { Authorization: `Bearer ${process.env.TOKEN_ID}` },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        return result;
      }
      
      
      query({ "inputs": data }).then((response) => {
        // Extract sentiment label with the highest score
        const predictions = response[0];
        const maxScorePrediction = predictions.reduce((max, prediction) => (prediction.score > max.score ? prediction : max), { score: -1 });
        return maxScorePrediction.label;
      //   console.log("Predicted Sentiment:", maxScorePrediction.label);
      });

}




module.exports = {sentiment};
