const fs = require('fs');
const path = require('path');

const cleaner = {
    removeTmpFiles: function (dir) {
        fs.readdir(dir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
            if (err) throw err;
            console.log(`removing ${dir}/${file}`);
            });
        }
        });
    }
}

module.exports = cleaner;