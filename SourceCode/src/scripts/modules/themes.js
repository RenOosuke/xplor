const initialTheme = (() => {
    TODO(`Once settings utils is done, the selected theme should be read from there and not hardcoded`);
    return settings.get("theme.design.selected");
})();

const themeUtils = {
    version: initialTheme.split('/')[0],
    selectedTheme: initialTheme,

    changeTheme: (themeName) => {
        TODO(`When user directory has been created, if not in DEV mode, read/write themes to "C:\\User\\XPlor\\themes" for example`)
        themeUtils.version = themeName.split('/')[0];
        themeUtils.selectedTheme = themeName;
        const pathToThemes = path.resolve('../themes');
        const pathToTheme = path.join(pathToThemes, themeName, `theme.css`);
        
        let design_theme = jQuery(".design_theme")[0];
        design_theme.href = pathToTheme;
        console.log(design_theme);
        // const root = document.documentElement;
        // console.log(pathToThemes);
        // let themeFile = readJSON(pathToTheme, {safeFallback: {
        //     bg: {},
        //     text: {},
        //     border_color: {},
        //     app_borders: {},
        // }})

        // let iconKeyProperties = {
        //     control_button_primary_outer_border: true,
        //     minimize_icon: true,
        //     maximize_icon: true,
        //     unmaximize_icon: true,
        //     close_icon: true,
        //     control_button_primary_outer_border_hovered: true,
        //     control_button_destructive_outer_border: true,
        //     control_button_destructive_outer_border_hovered: true
        // }
        
        // Object.keys(themeFile.bg).forEach((bgKey) => {
        //     root.style.setProperty(`--${bgKey}_bg`, themeFile.bg[bgKey]);
        // })

        // Object.keys(themeFile.text).forEach((textKey) => {
        //     root.style.setProperty(`--${textKey}_color`, themeFile.text[textKey]);
        // })

        // Object.keys(themeFile.border_color).forEach((bcKey) => {
        //     root.style.setProperty(`--${bcKey}_border_color`, themeFile.border_color[bcKey]);
        // })

        // Object.keys(themeFile.border).forEach((borderKey) => {
        //     Object.keys(themeFile.border[borderKey]).forEach((borderSubKey) => {
        //         root.style.setProperty(`--${borderKey}_${borderSubKey}`, themeFile.border[borderKey][borderSubKey]);
        //     })
        // })

        // Object.keys(themeFile.app_borders).forEach((appKey) => {
        //     let value = themeFile.app_borders[appKey];

        //     if(appKey == "window_texture") {
        //         let pathToTexture = path.resolve(`${path.dirname(pathToTheme)}\\${value}`)
        //         .split("\\").join("\\\\");

        //         value = `url("${pathToTexture}")`;
        //     }

        //     if(iconKeyProperties[appKey] && (value.includes(".png") || value.includes(".svg"))) {
        //         let pathToIcon = path.resolve(`${path.dirname(pathToTheme)}\\${value}`)
        //         .split("\\").join("\\\\");

        //         value = `url("${pathToIcon}")`;
        //     }

        //     root.style.setProperty(`--app_${appKey}`, value);
        // })

        // let pathBaseName = path.basename(pathToTheme);
        // themeUtils.themeChangeEvents.forEach((eventFunction) => {
        //     eventFunction(themeUtils.version, pathBaseName)
        // })
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

    themeChangeEvents: []
};

themeUtils.changeTheme(initialTheme);