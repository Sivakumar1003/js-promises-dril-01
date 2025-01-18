const fileSystem = require('fs').promises;

//  function to create and delete files simultaneously.
function createAndDeleteFiles(fileCount, data) {

    //  create a directory.
    fileSystem.mkdir('./DemoFolder', { recursive: true })
        .then((res) => {
            console.log("folder created.");
            let fileCreateResult = [];
            for (let index = 1; index <= fileCount; index++) {
                fileCreateResult.push(fileSystem.writeFile(`./DemoFolder/file_${index}.json`, JSON.stringify(data)));
            }
            Promise.all(fileCreateResult);
        })
        .then(() => {
            console.log(`${fileCount} files created.`);

            let fileDeleteResult = [];
            for (let index = 1; index <= fileCount; index++) {
                fileDeleteResult.push(fileSystem.unlink(`./DemoFolder/file_${index}.json`));
            }

            //  check all the file are created else all will pass the error.
            Promise.all(fileDeleteResult);
        })
        .catch((error) => {
            console.log("not able to create files.");
            console.log(error);
        });
}

module.exports = createAndDeleteFiles;