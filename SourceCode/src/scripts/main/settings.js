{
    const SETTINGS_PATH = path.resolve('public/data/settings.json');
    const DEFAULT_SETTINGS = {
        drives: {
            network: [

            ]
        },
        theme: {
            design: {
                selected: `Vista/AeroClassic`,
                installed: [
                    {
                        OS: '2000',
                        themes: [],
                    },
                    {
                        OS: 'XP',
                        themes: [],
                    },
                    {
                        OS: 'Vista',
                        themes: [
                            {
                                name: "AeroClassic"
                            }
                        ],
                    },
                    {
                        OS: '7',
                        themes: [
                        ],
                    },
                    {
                        OS: '8',
                        themes: [
                        ],
                    },
                    {
                        OS: '10',
                        themes: [
                        ],
                    },
                    {
                        OS: '11',
                        themes: [
                        ],
                    },
                ]
            },
            icons: {
                OS: 'Vista',
                name: 'Classic'
            }
        }
    };

    class SettingsManager {
        constructor() {
            this._ensureSettingsFile();
            this.settings = this._loadSettings();
            this._watchSettingsFile();
        }

        /** Ensures the settings file exists */
        _ensureSettingsFile() {
            const dir = path.dirname(SETTINGS_PATH);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
            if (!fs.existsSync(SETTINGS_PATH)) this._saveSettings(DEFAULT_SETTINGS);
        }

        /** Loads settings from the JSON file */
        _loadSettings() {
            try {
                return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf8'));
            } catch (error) {
                console.error("Error loading settings:", error);
                return Object.assign({}, DEFAULT_SETTINGS);
            }
        }

        /** Saves settings to file atomically */
        _saveSettings(newSettings) {
            this.settings = Object.assign({}, this.settings, newSettings);
            this.save();
        }

        /** Get a setting by path (dot notation) */
        get(section) {
            return section.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : {}, this.settings);
        }

        /** Set a setting by path (dot notation) */
        set(section, value, shouldSave) {
            const keys = section.split('.');
            let obj = this.settings;
            while (keys.length > 1) {
                const key = keys.shift();
                obj[key] = obj[key] || {};
                obj = obj[key];
            }
            obj[keys[0]] = value;

            if(shouldSave) {
                this._saveSettings(this.settings);
            }
        }

        save() {
            fs.writeFileSync(SETTINGS_PATH + '.tmp', JSON.stringify(this.settings, null, 4), 'utf8');
            fs.renameSync(SETTINGS_PATH + '.tmp', SETTINGS_PATH);
        }

        /** Watches the settings file for external changes */
        _watchSettingsFile() {
            fs.watch(SETTINGS_PATH, (eventType) => {
                if (eventType === 'change') {
                    const updatedSettings = this._loadSettings();
                    // let editedBy = updatedSettings.editedBy;
                    
                    if (JSON.stringify(updatedSettings) !== JSON.stringify(this.settings)) {
                        this.settings = updatedSettings;
                    }
                }
            });
        }

        /** Logs current settings */
        log() {
            console.log(this.settings);
        }
    }

    // Attach the class instance to the global `window.settings`
    window.settings = new SettingsManager();
}