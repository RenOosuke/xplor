{
    /**@type {SettingsPaths} */
    const networkDrivesAddress = "drives.network";

    /**@type {(networkDrive: networkDrive) => void} */
    const AddANetworkDrive = (networkDrive) => {
        let networkDrives = settings.get(networkDrivesAddress);
        networkDrives.push(networkDrive);
        settings.set(networkDrivesAddress, networkDrives, true);
    }

    /**@type {(networkDrive: networkDrive) => void} */
    const RemoveANetworkDrive = (networkDrive) => {
        let networkDrives = settings.get(networkDrivesAddress);
        let driveIndexToRemove = networkDrives.findIndex(drive => drive.ip == networkDrive.ip || drive.name == networkDrive.name )
        networkDrives.splice(driveIndexToRemove, 1);
        settings.set(networkDrivesAddress, networkDrives, true);
    };

    /**@type {(networkDrive: networkDrive) => boolean} */
    const CheckIsDriveConnected = (ip) => {
        return new Promise((res, rej) => {
            try {
                // On Windows, use `ping -n 1`
                // On Linux/macOS, use `ping -c 1`
                let command = process.platform === "win32" ? `ping -n 1 ${ip}` : `ping -c 1 ${ip}`;
                let result = undefined;

                child_process.exec(command, (err, stdout, stderr) => {
                    if(stdout.includes("unreachable")) {
                        result = false;
                    };

                    if(result === undefined) {
                        result = true;
                    }
                    
                    res(result); // If ping is successful, return true
                });

            } catch (error) {
                res(false); // If ping fails, return false
            }
        })
    }

    window.NetworkUtils = {
        drives: {
            add: AddANetworkDrive,
            remove: RemoveANetworkDrive,
            isConnected: CheckIsDriveConnected
        }
    }
}