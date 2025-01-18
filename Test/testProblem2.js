/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const {readFile, convertUpperCase, convertLowerCaseAndSplit, sortFile, deleteFiles} = require('../problem2.js');

//  calling all the function.
readFile('./lipsum_1.txt')
    .then((data) => {
        return convertUpperCase(data);
    })
    .then((upperCasePath) => {
        return convertLowerCaseAndSplit(upperCasePath);
    })
    .then((lowerCasePath) => {
        return sortFile(lowerCasePath)
    })
    .then(() => {
        return deleteFiles('./fileName.txt');
    })
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error)
    })