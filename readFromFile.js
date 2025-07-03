const fs = require('fs')

const readFromFile = (filename) => {
    const str = fs.readFileSync(filename, 'utf8');
    return str;
}

module.exports = {readFromFile};