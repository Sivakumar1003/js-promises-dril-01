/*
    Problem 1:
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const createAndDeleteFiles = require('../problem1');

let fileCount = 5;
let data = {
    'name': "sivakumar", 
    'age': 22
}

// calling the function.
createAndDeleteFiles(fileCount, data);