const fs = require('fs')

const writeToFile = (data,filename) => {
    fs.writeFileSync(filename,data)

}

module.exports = {writeToFile}