const path = require('path'),
    //fs = require('fs');
    fs = require('fs/promises')

const dbFilePath = path.join(__dirname, '../db/data.json')

async function getData(){
    const fileContents = await fs.readFile(dbFilePath, { encoding : 'utf8'})
    const taskList = JSON.parse(fileContents)
    return taskList
}

async function saveData(taskList){
    return fs.writeFile(dbFilePath, JSON.stringify(taskList))
}

//using Promise (converting callbacks to promises)
/* function getData(){
    const p = new Promise((resolveFn, rejectFn) => {
        fs.readFile(dbFilePath, { encoding : 'utf8'}, (err, fileContents) => {
            if (err){
                return rejectFn(err)
            }
            const taskList = JSON.parse(fileContents)
            return resolveFn(taskList)
        });
    })
    return p;
}

function saveData(taskList){
    const p = new Promise((resolveFn, rejectFn) => {
        fs.writeFile(dbFilePath, JSON.stringify(taskList), err => {
           if (err) {
               return rejectFn(err)
           }
           return resolveFn()
        });
    })
    return p;
} */

//using callback
/* function getData(callback){
    fs.readFile(dbFilePath, { encoding : 'utf8'}, (err, fileContents) => {
        if (err){
            return callback(err, null)
        }
        const taskList = JSON.parse(fileContents)
        return callback(null, taskList)
    });
}

function saveData(taskList, callback){
    fs.writeFile(dbFilePath, JSON.stringify(taskList), err => {
        return callback(err);
    });
} */

module.exports = { getData, saveData };