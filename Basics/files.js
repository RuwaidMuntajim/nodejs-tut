const fs = require('fs');

fs.readFile('./Basics/docs/blog1.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data.toJSON())
    }
    
})
