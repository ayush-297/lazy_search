require("dotenv").config({ path: __dirname + "/.env"});

const config = {
    GROQ_API_KEY:process.env.API_KEY,
}

module.exports = {config};

