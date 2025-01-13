const EXECUTABLES_PATH = path.resolve('public/scripts/executables');
const ICONS_JSON_PATH = path.resolve('public/data/icons.json');
const EXE_ICONS_PATH = path.resolve('public/images/fileIcons/exe');

if(!window.nw) {
    window.nw = require("nw.gui");
}
if(!window.isSubwindow) {
    window.manifest = window.nw.App.manifest;
}

window.APP_WINDOW = {
    frame: manifest.window.frame,
    aero: manifest.window.transparent
}

window.DEV = manifest.DEV;

let ignoreTodos = true;
const ToDoList = new Set([]);

const processessCleanQueue = [];
