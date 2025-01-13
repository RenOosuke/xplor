const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

if(parseInt(require("os").release()) < 10) {
    fs.realpathSync = function (p, options) {
        try {
            return path.resolve(p);
        } catch (e) {
            if (e.code === 'ENOSYS') {
                // Fallback to `path.resolve` if `realpathSync` is unsupported
                console.log("Have to try to fix it somehow");
            }
            throw e;
        }
    };
}

const range = function (start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

const TODO = (todoMessage) => {
    if(!ignoreTodos) {
        console.log(`|====================== To Do: ${todoMessage} ===============================|`);
    }

    ToDoList.add(todoMessage);
}