const nwWindow = nw.Window.get();

const screenControls = {
    nwWindow: nwWindow,
    isFullScreen: () => {
        return nwWindow.height >= window.screen.availHeight && nwWindow.width >= window.screen.availWidth;
    },
}

const windowResizeEvents = 
[                   
    'restore',
    'maximize',
    'resize'
];

windowResizeEvents.forEach((evName) => {
    // IN ORDER FOR THIS TO BREAK, BECAUSE OF A NW BUG, YOU SHOULDN'T REFRESH USING F5, BUT RIGHT CLICK => `Reload App`
    nwWindow.on(evName, () => {
        let newEv = new Event('nw_custom_resize');

        document.dispatchEvent(newEv);
    })
})

window.processessCleanQueue = [];

window.addEventListener('beforeunload', () => {
    processessCleanQueue.forEach(cleanUpFunction => {
        cleanUpFunction();
    })
});

/** @type {<fallbackParameter>(_path: PathLike, secondaryData: {format: BufferEncoding, errorCallback: Function | undefined, safeFallback: fallbackParameter | undefined}) => undefined | fallbackParameter} */
const readJSON = (_path, secondaryData = {}) => {
    let dataToReturn;
    let {format = 'utf-8', errorCallback, safeFallback} = secondaryData;

    try {
        dataToReturn = JSON.parse(fs.readFileSync(_path, format));
    } catch(e) {
        dataToReturn = safeFallback;

        if(errorCallback) {
            errorCallback(e);
        }
    }

    return dataToReturn
}

/**
 * Function to replace object spread operator.
 * Merges objects into a new object.
 *
 * @param {...Object} objects - Objects to merge.
 * @returns {Object} - A new object with merged properties.
 */
function spreader(...objects) {
    return Object.assign({}, ...objects);
  }
  