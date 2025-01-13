type networkDrive = {
    name: string,
    ip: string
};

declare var settings: {
    /** Get a setting by path (dot notation) */
    get: <T = any>(section: SettingsPaths) => T;

    /** Set a setting by path (dot notation) */
    set: (section: SettingsPaths, value: any, shouldSave: boolean) => void;

    /** Save settings to file */
    save: () => void;

    /** Logs current settings */
    log: () => void;

    _saveSettings(newSettings: object): void,

    settings: defaultSettings,
};


type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}.${P}`
        : never
    : never;

type Paths<T> = T extends object
    ? {
          [K in keyof T]: K extends string
              ? T[K] extends object
                  ? K | Join<K, Paths<T[K]>>
                  : K
              : never;
      }[keyof T]
    : never;

type SettingsPaths = Paths<defaultSettings>;

type defaultSettings = {
    drives: {
        network: networkDrive[]
    },
}
