
window.WindowManager = (() => {
    let windows = {

    };

    const defaultNWWindowFunction = () => {
        alert("This is a function you should not be able to see.");

        return false;
    }
    
    let windowPromptQuit = defaultNWWindowFunction;

    let nwWindow = {
        minimize: defaultNWWindowFunction,
        maximize: defaultNWWindowFunction,
        unmaximize: defaultNWWindowFunction,
    };

    let lastWindowSetting = {};
    let isMaximizing = false;

    const saveLastWindowSettings = () => {
        lastWindowSetting.width = nwWindow.width;
        lastWindowSetting.height = nwWindow.height;
        lastWindowSetting.y = nwWindow.y;
        lastWindowSetting.x = nwWindow.x;
    }

    if(!window.isSubwindow) {
        nwWindow = nw.Window.get();
        
        windowPromptQuit = () => {
            let hasUnsavedFiles = false; // TODO
        
            if(!hasUnsavedFiles) {
                nw.App.quit();
            }
        }
    
        const windowResizeEvents = 
        [                   
            'restore',
            'maximize',
            'resize',
        ];
        
        windowResizeEvents.forEach((evName) => {
            // IN ORDER FOR THIS TO BREAK, BECAUSE OF A NW BUG, YOU SHOULDN'T REFRESH USING F5, BUT RIGHT CLICK => `Reload App`
            nwWindow.on(evName, () => {
                let newEv = new Event('nw_custom_resize');
        
                document.dispatchEvent(newEv);

                if(APP_WINDOW.aero && (evName == "resize" || evName == "restore") && (nwWindow.width != screen.width || nwWindow.height != screen.height)) {
                    if(!isMaximizing) {
                        saveLastWindowSettings();
                    } else {
                        isMaximizing = false;
                    }
                }
            })
        })

        if(APP_WINDOW.aero && !DEV) {
            let documentHasLoaded = !!document.body;
            nwWindow.on('move', () => {
                if(documentHasLoaded) {
                    let leftOffset = screen.availLeft - nwWindow.x;
                    let topOffset = screen.availTop - nwWindow.y;
                    let textureLayer = jQuery(".border_shadow .app_borders .texture_layer")[0];

                    textureLayer.style.setProperty("background-size", `${screen.availWidth}px ${screen.availHeight}px`);
                    textureLayer.style.setProperty("background-position", `${leftOffset}px ${topOffset}px`);
                } else {
                    documentHasLoaded = !!document.body;
                }
            })
        }
    }

    function getParentProcessWindows(processID, options = {}) {
        return new Promise((resolve, reject) => {
            const executablePath = `${EXECUTABLES_PATH}\\ListHWNDPerProcessID.exe`;
            const { visibleOnly = false, removeNameless = false, disallowedNames = [] } = options;

            // Construct arguments based on options
            const commandArgs = [processID];
            if (visibleOnly) commandArgs.push("/v");
            if (removeNameless) commandArgs.push("/r");
            if (disallowedNames.length > 0) commandArgs.push(`/f=${options.disallowedNames.join("|")}`);
    
            // Execute the command
            child_process.execFile(executablePath, commandArgs, { encoding: "utf-8" }, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error: ${stderr || error.message}`);
                    return;
                }
    
                // Parse output into an array of objects
                const result = stdout
                    .split("\n")
                    .filter(line => line.trim() !== "") // Remove empty lines
                    .map(line => {
                        const match = line.match(/HWND:\s+(\S+)\s+\|\s+Title:\s+(.*?)\s+\|\s+Class:\s+(.*?)\s+\|\s+Visible:\s+(Yes|No)/);
                        if (match) {
                            return {
                                hwnd: match[1],
                                title: match[2],
                                className: match[3],
                                isVisible: match[4] === "Yes"
                            };
                        }
                        return null;
                    })
                    .filter(item => item !== null); // Remove unmatched lines
    
                resolve(result);
            });
        });
    }

    const enableBlur = (hwnd) => {

    }

    const rerenderBlur = () => {
        return new Promise((resolve, reject) => {
            WindowManager.getParentProcessWindows(nw.process.pid, {removeNameless: true}).then(res => {
                /**@type {windowObject[]} */
                let _windowList = res; 
                _windowList.filter(_window => {
                    !_window.title.includes("Developer Tools")
                }).forEach((_window) => {

                    if(!windows[_window.hwnd]) {
                        windows[_window.hwnd] = true;
                        enableBlur(_window.hwnd);
                    }
                })
            })
        })
    };

    return {
        getParentProcessWindows,

        isFullScreen: () => {
            return nwWindow.height >= window.screen.availHeight && nwWindow.width >= window.screen.availWidth;
        },

        minimize: () => nwWindow.minimize(),
        maximize: () => {
            if(!window.isSubwindow && APP_WINDOW.aero) {
                isMaximizing = true;
                saveLastWindowSettings();
                nwWindow.width = screen.width;  
                nwWindow.height = screen.height;
                nwWindow.y = screen.availTop;
                nwWindow.x = screen.availLeft;
            } else {
                nwWindow.maximize();
            }
        },
        unmaximize: () => {
            if(!window.isSubwindow && APP_WINDOW.aero) {
              nwWindow.width = lastWindowSetting.width;
              nwWindow.height = lastWindowSetting.height;
              nwWindow.y = lastWindowSetting.y;
              nwWindow.x = lastWindowSetting.x;
            } else {
                nwWindow.unmaximize();
            }
        } ,
        windowPromptQuit,
    }
})()