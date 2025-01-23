const Groq = require("groq-sdk");
const chalk = require('chalk');
const {config} = require("../config");
const groq = new Groq({ apiKey:config.GROQ_API_KEY });

const engine = {
     main : async (promt) => {
            function getGroqChatCompletion(promt) {
                return groq.chat.completions.create({
                  messages: [
                    {
                      role: "user",
                      content: promt,
                    },
                  ],
                  model: "llama3-8b-8192",
                });
          }
          try{
            const chatCompletion = await getGroqChatCompletion(promt);
            return chatCompletion.choices[0]?.message?.content || "";
          }
          catch(e){
            console.log(chalk.rgb(212, 0, 0).italics("Somthing Went Wrong"));
            process.exit(1);
          }
        

      }
}

module.exports = {engine};