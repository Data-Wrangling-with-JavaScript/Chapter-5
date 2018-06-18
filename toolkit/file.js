const fs = require('fs');

//
// Read a text file form the file system.
//
function read (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8',
            function (err, textFileData) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

function write (fileName, textFileData) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, textFileData,
			function (err) {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			}
		);
	});
};

module.exports = {
	read: read,
	write: write,
};