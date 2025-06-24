const { response } = require("../app");
const aiService = require("../services/ai.service")


module.exports.getReview = async (req,res)=>{
    const code = req.body.code;

    if(!code){
        return res.status(400).send("Prompt is required!");
    }

    try {
      const response = await aiService(code);
      res.send(response);
    } catch (error) {
      if (error.message && error.message.includes('temporarily overloaded')) {
        res.status(503).send(error.message);
      } else {
        res.status(500).send('An unexpected error occurred.');
      }
    }
}