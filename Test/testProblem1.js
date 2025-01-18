/*
    Problem 1:
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const {createFiles, deleteFiles} = require('../problem1');

let fileCount = 4;
let data = {
    'name': "sivakumar", 
    'age': 22
}

// calling the function.
createFiles(fileCount, data)
.then((result) => {
    console.log(result);
    return deleteFiles(fileCount)
})
.then((deleteResult)=> {
    console.log(deleteResult);
})
.catch((error) => {
    console.log(error);
})