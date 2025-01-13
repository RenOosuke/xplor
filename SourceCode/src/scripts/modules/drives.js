
const DriverUtils = (() => {
    const { execFile, spawn } = child_process;
    const pathToDriveDetails = path.join(EXECUTABLES_PATH, 'DiskDetails.exe');
    const pathToDriveListener = path.join(EXECUTABLES_PATH, 'DriveListener.exe');
    const stepSeparator = "__Step__End__";
    const physicalDrivePartitionMapping = "Physical Drive: ";
    const deviceIDPlaceholder=`DeviceID="`;
    const driveSeparator = `----------------------------------------\r\n`;
    const step2Descriptor = `Physical__Drives__Info:`;
    const step3Descriptor = `Logical__Drives__Info:`;
    const PHYSICALDRIVE = "PHYSICALDRIVE";

    // Function to execute the DiskDetails.exe and parse the output
    function listDisks() {
        
        return new Promise((res, rej)=> {
            const logicalDrivesMap = {};
            const physicalDrives = {

            };

            const logicalDrives = {};

            // Run DiskDetails.exe to get physical and logical drive info
            execFile(pathToDriveDetails, [], (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing DiskDetails.exe: ${error.message}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
        
            let steps = stdout.split(stepSeparator);
            console.log(steps);

            const step1 = () => {
                const currentStep = steps[0];
                let lastDiskIndex;
    
                currentStep.split(deviceIDPlaceholder).forEach((mappingLine, index) => {
                    if(index>0) {
                        if(index%2) {
                            // Then it's a disk declaration
                            let indexOfSharp = mappingLine.indexOf("#");
                            let indexOfFirstComma =mappingLine.indexOf(",");
                            lastDiskIndex = parseInt(mappingLine.slice(indexOfSharp+1, indexOfFirstComma));
                        } else {
                            // Then it's a drive declaration
                            // logicalDrivesMap[lastDiskIndex]
                            let indexOfColon = mappingLine.indexOf(":");
                            let driveLetter = mappingLine.slice(0, indexOfColon);
                            logicalDrivesMap[driveLetter] = lastDiskIndex;
                        }
                    }
                });
            }
            
            const step2 = () => {
                const currentStep = steps[1];

                const keyMapping = {
                    "Device ID": "device_id",
                    "Model": "model",
                    "Media Type": "media_type",
                    "Size": "size",
                    "Interface Type": "interface_type",
                    "Manufacturer": "manufacturer",
                    "Serial Number": "serial_number",
                    "Firmware Revision": "firmware_revision",
                    "Partitions": "partitions",
                    "Status": "status"
                };

                currentStep.split(driveSeparator).forEach((mappingLine, index) => {
                    if(index>0 || mappingLine.trim() !== step2Descriptor) {
                        // console.log(mappingLine);
                        
                        let diskDetails = mappingLine.split("\n").reduce((acc, line, lineIndex) => {
                            let [key, value] = line.split(": ");

                            acc[keyMapping[key]] = value;
                            return acc;
                        }, {});


                        if(diskDetails.device_id.includes(PHYSICALDRIVE)) {
                            let diskIndex = diskDetails.device_id.split(PHYSICALDRIVE)[1];
                            physicalDrives[diskIndex.trim()] = diskDetails;
                        };

                    }
                })
            }

            const step3 = () => {
                const currentStep = steps[2];

                const keyMapping = {
                    "Drive":           "drive",
                    "Volume Name":     "volume_name",
                    "File System":     "file_system",
                    "Drive Type":      "drive_type",
                    "Total Space":     "total_space",
                    "Free Space":      "free_space",
                    "Occupied Space":  "occupied_space",
                };

                currentStep.split(driveSeparator).forEach((mappingLine, index) => {
                    if(index>0 || mappingLine.trim() !== step3Descriptor) {
                        let driveDetails = mappingLine.split("\n").reduce((acc, line, lineIndex) => {
                            console.log(line);
                            let [key, value] = line.split(": ");

                            if(key) {
                                acc[keyMapping[key]] = value;
                            };

                            return acc;
                        }, {});

                        if(driveDetails.drive.length == 4) {
                            driveDetails.letter = driveDetails.drive.split(":")[0]; 
                        };

                        let physicalDriveIndex;

                        if(driveDetails.letter) {
                            physicalDriveIndex = logicalDrivesMap[driveDetails.letter];
                        } else {
                            // Suppose it's a CD/DVD or a network disk
                            TODO(`Suppose it's a CD/DVD or a network disk!`);
                        }

                        if(physicalDriveIndex) {
                            let physicalDriveObject = physicalDrives[physicalDriveIndex];
                            driveDetails.disk = physicalDriveObject;
                        }

                        if(driveDetails.letter) {
                            logicalDrives[driveDetails.letter] = driveDetails;
                        }
                    }
                })
            }

            step1();
            step2();
            step3();
    
            res(logicalDrives);
            });
        }) 
    }

    const diskListener = (() => {
        let diskListenerProcess;

        return {
            start: () => {
                if (diskListenerProcess) {
                    console.warn('DiskListener is already running.');
                    return;
                }
                diskListenerProcess = spawn(pathToDriveListener);

                diskListenerProcess.stdout.on('data', (data) => {
                    console.log('DriveListener output:', data.toString());
                    // Here you can emit events or process the data as needed
                });

                diskListenerProcess.stderr.on('data', (data) => {
                    console.error('DriveListener error:', data.toString());
                });

                diskListenerProcess.on('close', (code) => {
                    console.log(`DriveListener exited with code ${code}`);
                    diskListenerProcess = null;
                });

                console.log('DriveListener started.');
            },

            kill: () => {
                if (diskListenerProcess) {
                    diskListenerProcess.kill();
                    console.log('DriveListener killed.');
                } else {
                    console.warn('DriveListener is not running.');
                }
            },

            restart: () => {
                console.log('Restarting DriveListener...');
                if (diskListenerProcess) {
                    diskListenerProcess.kill();
                }
                this.start();
            }
        };
    })();

    return {
        diskListener,
        listDisks
    };
})();

