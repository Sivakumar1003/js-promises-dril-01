const fileSystem = require('fs').promises;

//  function to read the file and return the data in it.
function readFile(path) {
    return fileSystem.readFile(path, 'utf-8')
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("not able to read the file.");
            return error;
        });
}

//  function to convert Upper  case and cerate ne file for it.
function convertUpperCase(data) {
    let UpperCaseData = data.toUpperCase();
    let path = './upper-case-file.txt';

    // creating new file.
    return fileSystem.writeFile(path, UpperCaseData)
        .then(() => {
            return addFileName(path);
        }).then(() => {
            return path;
        })
        .catch((error) => {
            console.error("err.");
            return error;
        });

}

// function to  convert lower case and split into new file.
function convertLowerCaseAndSplit(path) {
    let newPath = './lower-case-file.txt';

    // reading the previouds file by path.
    return fileSystem.readFile(path, 'utf-8')
        .then((data) => {
            let lowerCase = data.split('.')
                .reduce((file, sentence) => {
                    sentence = sentence.trim().toLowerCase();
                    return file + sentence + '\n';
                }, "");

            //  create new file for store the converted lower case file.
            return fileSystem.writeFile(newPath, lowerCase)
        })
        .then(() => {
            return addFileName(newPath);
        })
        .then(() => {
            return newPath;
        })
        .catch((error) => {
            console.error("not able to convert to lower case and split to new line.");
            return error;
        })
}

//  function to sort the conten inside the file.
function sortFile(path) {
    let newPath = './sort-sentence-file.txt';

    //  create new file for it.
    return fileSystem.readFile(path, 'utf-8')
        .then((data) => {
            sortSentence = data.split('\n')
                .sort().reduce((file, line) => {
                    return file + line + "\n";
                }, "");

            return fileSystem.writeFile(newPath, sortSentence)
        })
        .then(() => {
            return addFileName(newPath)
        })
        .then(() => {
            return newPath;
        })
        .catch((error) => {
            console.error(`not able to sort the sentence in ${path} file.`);
            return error;
        })
}

//  function to delete all the new file created.
function deleteFiles(path) {
    return fileSystem.readFile(path, 'utf-8')
        .then((files) => {
            files = files.split('\n')
                .filter((lines) => {
                    return lines !== "";
                });

            //  delete all files.
            for (let file of files) {
                fileSystem.unlink(file);
            }
        })
        .catch((error) => {
            console.error("not able to delete the files.");
            return error;
        })
}

//  function to add file name for new file in fileName.txt file.
function addFileName(path) {
    return fileSystem.writeFile('./fileName.txt', path + '\n', { flag: 'a' })
        .then(() => {
            console.log(`${path.slice(2)} file added.`);
            return path;
        })
        .catch((error) => {
            console.log(`not able to create ${path.slice(2)} file`);
            return error;
        })
}

module.exports = { readFile, convertUpperCase, convertLowerCaseAndSplit, sortFile, deleteFiles };