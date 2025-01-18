const fileSystem = require('fs');

//  function to read the file and return the data in it.
function readFile(path) {
    //  returning a promises.
    return new Promise((resolve, reject) => {
        fileSystem.readFile(path, 'utf-8', (error, data) => {
            if (error) {
                reject("Not able to read the file.");
            } else {
                resolve(data);
            }
        });
    });
}

//  function to convert Upper  case and cerate ne file for it.
function convertUpperCase(data) {
    let UpperCaseData = data.toUpperCase();

    return new Promise((resolve, reject) => {

        // creating new file.
        fileSystem.writeFile('./upper-case-file.txt', UpperCaseData, (error) => {
            if (error) {
                reject("Not able to create upper-case-file.txt.");
            } else {
                resolve(addFileName('./upper-case-file.txt'));
            }
        });
    });

}

// function to  convert lower case and split into new file.
function convertLowerCaseAndSplit(path) {

    return new Promise((resolve, reject) => {
        // reading the previouds file by path.
        fileSystem.readFile(path, 'utf-8', (error, UpperCaseData) => {
            if (error) {
                reject("Not ble to read the Upper case file.");
            } else {
                let lowerCaseData = UpperCaseData.split(".")
                    .reduce((file, sentence) => {
                        sentence = sentence.trim().toLowerCase();
                        return file + sentence + '\n';
                    }, "");

                // creating new file.
                fileSystem.writeFile('./lower-case-file.txt', lowerCaseData, (error) => {
                    if (error) {
                        reject("Not able to create new file Lower case file.");
                    } else {
                        resolve(addFileName('./lower-case-file.txt'));
                    }
                });
            }
        });
    });
}

//  function to sort the conten inside the file.
function sortFile(path) {

    return new Promise((resolve, reject) => {

        // reading the previouds file by path.
        fileSystem.readFile(path, 'utf-8', (error, lowerCaseData) => {
            if (error) {
                reject("Not ble to read the Lower case file.");
            } else {
                sortSentence = lowerCaseData.split('\n').sort()
                    .reduce((file, line) => {
                        return file + line + "\n";
                    }, "");

                //  create new file for it. 
                fileSystem.writeFile('./sort-sentence-file.txt', sortSentence, (error) => {
                    if (error) {
                        reject("Not able to create new file Lower case file.")
                    } else {
                        resolve(addFileName('./sort-sentence-file.txt'))
                    }
                });
            }
        });
    });
}

//  function to delete all the new file created.
function deleteFiles(path) {

    return new Promise((resolve, reject) => {
        // reading the previouds file by path.
        fileSystem.readFile(path, 'utf-8', (error, filesData) => {
            if (error) {
                reject("Cannot able to read the fileName.txt file.")
            } else {
                filesData = filesData.split('\n')
                    .filter((lines) => {
                        return lines !== "";
                    });

                //  deleting all file in fileName.txt
                for (let fileName of filesData) {
                    fileSystem.unlink(fileName, (error) => {
                        if (error) {
                            reject(`Cannot able to delete the file ${fileName.slice(2)}`);
                        }
                    })
                }
                resolve("All files are deleted.");
            }
        })
    });
}

//  function to add file name for new file in fileName.txt file.
function addFileName(path) {
    return new Promise((resolve, reject) => {
        fileSystem.writeFile('./fileName.txt', path + '\n', { flag: 'a' }, (error) => {
            if (error) {
                reject(`not able to add ${path} in fileName.txt.`);
            } else {
                console.log(`${path.slice(2)} file added.`);
                resolve(path);
            }
        })

    })
}

async function testResult() {
    try {
        let data = await readFile('./lipsum_1.txt');

        let upperCasePath = await convertUpperCase(data);

        let lowerCasePath = await convertLowerCaseAndSplit(upperCasePath);

        await sortFile(lowerCasePath);

        let result = await deleteFiles('./fileName.txt');
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = { testResult };