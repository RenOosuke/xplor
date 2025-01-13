const IconUtils = (() => {
    let iconsData = {};

    const parseIcon = (exePath, refresh) => {
        const outputFolder = EXE_ICONS_PATH; // Where extracted icons will be saved
        const currentTime = new Date();
    
        return new Promise((resolve, reject) => {
            // Check existing entry in JSON
            if (iconsData[exePath]) {
                const { last_scanned } = iconsData[exePath];
                const lastScannedDate = new Date(last_scanned);
    
                if (!refresh && currentTime - lastScannedDate < 7 * 24 * 60 * 60 * 1000) {
                    return resolve(); // Skip processing if not refreshing and scanned within a week
                }
            }
    
            // Generate a GUID for the icon or reuse an existing one
            let guid;
            if (iconsData[exePath] && iconsData[exePath].icon) {
                guid = path.basename(iconsData[exePath].icon, '.ico');
            } else {
                guid = ElementUtils.generateId("icon").replace(".", "");
            }
    
            const finalIconPath = path.join(outputFolder, guid);
    
            // Execute IconWrapper.exe
            const command = `IconWrapper.exe "${exePath}" "${outputFolder}" "${guid}"`;
            child_process.exec(command, { cwd: EXECUTABLES_PATH }, (execErr, stdout, stderr) => {
                if (execErr) {
                    console.error(`Error executing IconWrapper.exe for ${exePath}:`, stderr || execErr.message);
                    return reject(execErr);
                }
    
                console.log(stdout); // Log IconWrapper.exe output
    
                // Update iconsData
                iconsData[exePath] = {
                    last_scanned: currentTime.toISOString(),
                    icon: `${guid}.ico`,
                };
    
                resolve(); // Resolve after processing
            });
        });
    };
    
    const parseIcons = (exePaths, refresh = false) => {
        iconsData = readJSON(ICONS_JSON_PATH, { safeFallback: {} });

        const tasks = exePaths.map((exePath) => {
            if (!fs.existsSync(exePath)) {
                console.warn(`File not found: ${exePath}`);
                return Promise.resolve();
            }
            return parseIcon(exePath, refresh, iconsData);
        });

        // Execute all tasks and save the updated JSON
        return Promise.all(tasks).then(() => {
            writeJSONasync(ICONS_JSON_PATH, iconsData);
            return iconsData;
        });
    };

    const refreshIconReference = (callback) => {
        // Read the iconsData JSON
        readJSONasync(ICONS_JSON_PATH, { safeFallback: {} }).then(newIconsData => {

            // Update the reference to hold the most recent data
            iconsData = newIconsData;
    
            // console.log("IconsData refreshed successfully.");
            if (callback) callback(null, iconsData);
        });
    };

    const clean = () => {
        // Read the iconsData JSON
        refreshIconReference(() => {
            fs.readdir(EXE_ICONS_PATH, (readdirErr, files) => {
                if (readdirErr) {
                    console.error("Error reading EXE_ICONS_PATH:", readdirErr);
                    return;
                }
    
                // Filter .ico files
                const iconFiles = files.filter(file => file.endsWith('.ico'));
    
                // Create a Set of all icons currently referenced in iconsData
                const referencedIcons = new Set(
                    Object.values(iconsData)
                        .map(data => data.icon)
                );
    
                // Process each .ico file
                const deleteTasks = iconFiles.map(iconFile => {
                    return new Promise((resolve) => {
                        if (!referencedIcons.has(iconFile)) {
                            const filePath = path.join(EXE_ICONS_PATH, iconFile);
                            fs.unlink(filePath, (unlinkErr) => {
                                if (unlinkErr) {
                                    console.error(`Error deleting file ${filePath}:`, unlinkErr);
                                } else {
                                    console.log(`Deleted unreferenced icon: ${filePath}`);
                                }
                                resolve();
                            });
                        } else {
                            resolve();
                        }
                    });
                });
    
                // Wait for all deletion tasks to complete
                Promise.all(deleteTasks)
                    .then(() => {
                        // Save the updated iconsData back to the JSON file
                        writeJSONasync(ICONS_JSON_PATH, iconsData, (writeErr) => {
                            if (writeErr) {
                                console.error("Error writing iconsData:", writeErr);
                            } else {
                                console.log("Cleanup completed successfully.");
                            }
                        });
                    })
                    .catch(taskErr => {
                        console.error("Error during cleanup tasks:", taskErr);
                    });
            });
        })
    };
    

    // Add the clean function to the returned object
    return {
        parseIcons,
        clean,
        refreshIconReference,
        get: () => iconsData
    };    
})();
