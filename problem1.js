const fileSystem = require('fs');

//  function to create and delete files simultaneously.
function createFiles(fileCount, data) {

    return new Promise((resolve, reject) => {
        //  create a directory.
        fileSystem.mkdir('./DemoFolder', { recursive: true }, ((error) => {
            if (error) {
                reject("Not able to create new folder");
            } else {
                console.log("folder created.");
                for (let index = 1; index <= fileCount; index++) {
                    fileSystem.writeFile(`./DemoFolder/file_${index}.json`, JSON.stringify(data), ((error) => {
                        if (error) {
                            reject(`Not able to create file_${index}.json`);
                        }
                    }));
                }
                resolve("all files are created.")
            }
        }))
    });
}

function deleteFiles(fileCount) {
    return new Promise((resolve, reject) => {
        for (let index = 1; index <= fileCount; index++) {
            fileSystem.unlink(`./DemoFolder/file_${index}.json`, (error) => {
                if(error) {
                    reject(`not able to delete file_${index}.json file.`)
                }
            });
        }
        resolve("all files are deleted.")
    })
}

module.exports = { createFiles, deleteFiles };