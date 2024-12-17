const initialTheme = (() => {
    TODO(`Once settings utils is done, the selected theme should be read from there and not hardcoded`);
    return `XPClassic`;
})();

const themeUtils = {

    selectedTheme: initialTheme,

    changeTheme: (themeName) => {
        TODO(`When user directory has been created, if not in DEV mode, read/write themes to "C:\\User\\XPlor\\themes" for example`)
        const pathToThemes = path.resolve('../themes')
        const pathToTheme = path.join(pathToThemes, `${themeName}.json`);
        const root = document.documentElement;
        // console.log(pathToThemes);
        let themeFile = readJSON(pathToTheme, {safeFallback: {
            bg: {},
            text: {}
        }})
        
        Object.keys(themeFile.bg).forEach((bgKey) => {
            root.style.setProperty(`--${bgKey}_bg`, themeFile.bg[bgKey]);
        })

        Object.keys(themeFile.text).forEach((textKey) => {
            root.style.setProperty(`--${textKey}_color`, themeFile.text[textKey]);
        })

        Object.keys(themeFile.border_color).forEach((bcKey) => {
            root.style.setProperty(`--${bcKey}_border_color`, themeFile.border_color[bcKey]);
        })

        // con
        // root.style.setProperty("--sidebar-inactive-icon", inactiveColor);
        // root.style.setProperty("--sidebar-active-icon", activeColor);
        
        // let iconsPath = themeUtils.iconsPath();

        // let iconNames = [
        //     'files',
        //     'search',
        //     'debug',
        //     'account',
        //     'settings',
        //     'left_arrow',
        //     'right_arrow',
        //     'more',
        //     'git',
        //     'chevron-right',
        //     'chevron-left',
        //     'chevron-down',
        //     'chevron-up',
        //     'close-all-editors',
        //     'collapse-all',
        //     'expand-all',
        //     'filter',
        //     'new-file',
        //     'new-folder',
        //     'pin',
        //     'refresh',
        //     'save-all',
        //     'split-horizontal',
        //     'close'
        // ];

        // iconNames.forEach((iconName) => {
        //     root.style.setProperty(`--${iconName}-icon`, `url('${iconsPath}/${iconName}.svg') no-repeat center`)
        // });

        // let colorVariablesMapping = {
        //     '--primary-dark-bg': '#181818',
        //     '--primary-light-bg': '#1f1f1f',
        //     '--primary-light2-bg': '#adaeae',
        //     '--primary-light3-bg': '#444444',
        //     '--directory-rename-bg': '#313131',
        //     '--outline-color': '#0078d4',
        //     '--base-text-color': '#cccccc',
        //     '--base-text-color-80': '#cccccccc',
        //     '--base-text-color-60': '#cccccc99',
        //     '--base-text-color-40': '#cccccc66',
        //     '--base-border-color': '#2b2b2b',
        //     '--secondary-border-color': '#454545',
        //     '--icon-hover-bg': '#2d2e2e',
        //     '--tooltip-bg': '#202020',
        //     '--item-select-bg': '#04395e',
        //     '--gray-out-selection': '#37373d',
        //     '--error-border-color': '#bd1100',
        //     '--tree-line': '#313131',
        //     '--focused-tree-line': '#585858',
        //     '--file-hover-unselected': 'rgba(60, 66, 68, 0.35)',
        //     '--file-search-bg': '#222222',
        //     '--file-search-hover-bg': '#2a2d2e',
        //     '--file-search-sections-labels-color': '#3794ff',
        //     '--file-search-subtext-color': '#999999',
        //     '--file-search-marker-color': '#2aaaff',
        //     '--timeline-tip-color': '#717171'
        // };

        // let colorVariables = Object.keys(colorVariablesMapping);

        // colorVariables.forEach((varName) => {
        //     root.style.setProperty(varName, colorVariablesMapping[varName]);
        // })
    },
};

themeUtils.changeTheme(initialTheme);