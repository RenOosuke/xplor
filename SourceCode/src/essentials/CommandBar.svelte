<script>
    const settingsTabNames = [
        `file`,
        `edit`,
        `view`,
        `favorites`,
        `tools`,
        `help`,
        `customize`
    ];

    const tabConfigs = {
        file: {
            label: `File`,
        },
        edit: {
            label: `Edit`,
        },
        view: {
            label: `View`,
        },
        favorites: {
            label: `Favorites`,
        },
        tools: {
            label: `Tools`,
        },
        help: {
            label: `Help`,
        },
        customize: {
            label: `Customize`
        }
    }
    
    const getTabOptions = (tabName) => {
        try {

            TODO("Ability to save to and read from settings checked fields (selected)");
    
            const pathToDesignThemes = path.resolve('../themes');
            const allDesignThemes = settings.get("theme.design.installed").map((OSOption) => {
                return {
                    name: `${OSOption.OS}`,
                    label: `Windows ${OSOption.OS} (${OSOption.themes.length})`,
                    options: OSOption.themes.map((theme, themeIndex) => {
                        return {
                            name: theme.name,
                            label: theme.name,
                            click: () => {
                                settings.set("theme.design.selected", `${OS}/${theme.name}`, true);
                            }
                        }
                    })
                }
            });
    
            // const designThemesByOS = getAllFilesSync(pathToDesignThemes);
            
            const customize = [
                {
                    name: 'color_theme',
                    label: 'Change Color Theme',
                    options: allDesignThemes
                },
                {
                    name: 'icon_theme',
                    label: 'Change Icon Theme',
                }
            ];
    
            const optionsByTab = 
            {        
                file: [
                    {
                        label: "Open",
                        name: "open"
                    },
                    {
                        label: "Explore here",
                        name: "explore_here"
                    },
                    {
                        label: "Open With...",
                        name: "open_with"
                    },
                    {
                        separator: true
                    },
                    {
                        label: "Send To",
                        name: "send_to"
                    },
                    {
                        separator: true
                    },
                    {
                        label: "New",
                        name: "new",
                        options: [
                            {
                                label: "Folder",
                                name: "folder"
                            },
                            {
                                label: "Shortcut",
                                name: "shortcut"
                            },
                            {
                                separator: true
                            },
                            {
                                label: "Briefcase",
                                name: "briefcase"
                            },
                            {
                                label: "Bitmap Image",
                                name: "bitmap_image"
                            },
                            {
                                label: "Wordpad Document",
                                name: "wordpad_document"
                            },
                            {
                                label: "Rich Text Document",
                                name: "rich_text_document"
                            },
                            {
                                label: "Text Document",
                                name: "text_document"
                            },
                            {
                                label: "Wave Sound",
                                name: "wave_sound"
                            },
                            {
                                label: "Compressed (zipped) Folder",
                                name: "compressed_zipped_folder"
                            }
                        ]
                    },
                    {
                        separator: true
                    },
                    {
                        label: "Create Shortcut",
                        name: "create_shortcut"
                    },
                    {
                        label: "Delete",
                        name: "delete"
                    },
                    {
                        label: "Rename",
                        name: "rename"
                    },
                    {
                        label: "Properties",
                        name: "properties"
                    },
                    {
                        separator: true
                    },
                    {
                        label: "Close",
                        name: "close"
                    }
                ],
                edit: [
                    {
                        "label": "Undo Copy",
                        "name": "undo_copy",
                        "shortcut": "Ctrl+Z"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Cut",
                        "name": "cut",
                        "shortcut": "Ctrl+X"
                    },
                    {
                        "label": "Copy",
                        "name": "copy",
                        "shortcut": "Ctrl+C"
                    },
                    {
                        "label": "Paste",
                        "name": "paste",
                        "disabled": true,
                        "shortcut": "Ctrl+V"
                    },
                    {
                        "label": "Paste Shortcut",
                        "name": "paste_shortcut",
                        "disabled": true
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Copy To Folder...",
                        "name": "copy_to_folder"
                    },
                    {
                        "label": "Move To Folder...",
                        "name": "move_to_folder"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Select All",
                        "name": "select_all",
                        "shortcut": "Ctrl+A"
                    },
                    {
                        "label": "Invert Selection",
                        "name": "invert_selection"
                    }
                ],
                view: [
                    {
                        "label": "Toolbars",
                        "name": "toolbars",
                        "options": [
                        {
                            "label": "Standard Buttons",
                            "name": "standard_buttons"
                        },
                        {
                            "label": "Address Bar",
                            "name": "address_bar",
                            "selected": true
                        },
                        {
                            "label": "Links",
                            "name": "links"
                        },
                        {
                            "separator": true
                        },
                        {
                            "label": "Lock the Toolbars",
                            "name": "lock_toolbars",
                            "selected": true
                        },
                        {
                            "label": "Customize...",
                            "name": "customize"
                        }
                    ]
                    },
                    {
                        "label": "Status Bar",
                        "name": "status_bar"
                    },
                    {
                        "label": "Explorer Bar",
                        "name": "explorer_bar",
                        "options": [
                            {
                                "label": "Search",
                                "name": "search",
                                "shortcut": "Ctrl+E"
                            },
                            {
                                "label": "Favorites",
                                "name": "favorites",
                                "shortcut": "Ctrl+I"
                            },
                            {
                                "label": "History",
                                "name": "history",
                                "shortcut": "Ctrl+H"
                            },
                            {
                                "label": "Folders",
                                "name": "folders"
                            },
                            {
                                "separator": true
                            },
                            {
                                "label": "Tip of the Day",
                                "name": "tip_of_the_day"
                            }
                        ]
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Thumbnails",
                        "name": "thumbnails"
                    },
                    {
                        "label": "Tiles",
                        "name": "tiles",
                        "selected": true
                    },
                    {
                        "label": "Icons",
                        "name": "icons"
                    },
                    {
                        "label": "List",
                        "name": "list"
                    },
                    {
                        "label": "Details",
                        "name": "details"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Arrange Icons by",
                        "name": "arrange_icons_by",
                        "options": [
                            {
                                "label": "Name",
                                "name": "name",
                                "selected": true
                            },
                            {
                                "label": "Size",
                                "name": "size"
                            },
                            {
                                "label": "Type",
                                "name": "type"
                            },
                            {
                                "label": "Modified",
                                "name": "modified"
                            },
                            {
                                "separator": true
                            },
                            {
                                "label": "Show in Groups",
                                "name": "show_in_groups"
                            },
                            {
                                "label": "Auto Arrange",
                                "name": "auto_arrange",
                                "selected": true
                            },
                            {
                                "label": "Align to Grid",
                                "name": "align_to_grid"
                            }
                        ]
                    },
                    {
                        "label": "Choose Details...",
                        "name": "choose_details"
                    },
                    {
                        "label": "Customize This Folder...",
                        "name": "customize_this_folder"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Go To",
                        "name": "go_to",
                        "options": [
                            {
                                "label": "Back",
                                "name": "back",
                                "shortcut": "Alt+Left Arrow",
                                "disabled": true
                            },
                            {
                                "label": "Forward",
                                "name": "forward",
                                "shortcut": "Alt+Right Arrow",
                                "disabled": true
                            },
                            {
                                "label": "Up One Level",
                                "name": "up_one_level"
                            },
                            {
                                "separator": true
                            },
                            {
                                "label": "Home Page",
                                "name": "home_page",
                                "shortcut": "Alt+Home"
                            },
                            {
                                "separator": true
                            },
                            {
                                "label": "XPCode (MOCK DIRECTORY)",
                                "name": "xpcode",
                                "selected": true
                            },
                        ]
                    },
                    {
                        "label": "Refresh",
                        "name": "refresh"
                    }
                ],
                favorites: [
                    {
                        "label": "Add to Favorites...",
                        "name": "add_to_favorites"
                    },
                    {
                        "label": "Organize Favorites...",
                        "name": "organize_favorites"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Links",
                        "name": "links",
                        "options": [
                            {
                                "label": "Customize Links",
                                "name": "customize_links"
                            },
                            {
                                "label": "Free Hotmail",
                                "name": "free_hotmail"
                            },
                            {
                                "label": "Windows",
                                "name": "windows"
                            },
                            {
                                "label": "Windows Marketplace",
                                "name": "windows_marketplace"
                            },
                            {
                                "label": "Windows Media",
                                "name": "windows_media"
                            }
                        ]
                    },
                    {
                        "label": "MSN.com",
                        "name": "msn_com"
                    },
                    {
                        "label": "Radio Station Guide",
                        "name": "radio_station_guide"
                    }
                ],
                tools: [
                    {
                        "label": "Map Network Drive...",
                        "name": "map_network_drive"
                    },
                    {
                        "label": "Disconnect Network Drive...",
                        "name": "disconnect_network_drive"
                    },
                    {
                        "label": "Synchronize...",
                        "name": "synchronize"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Folder Options...",
                        "name": "folder_options"
                    }
                ],
    
                help: [
                    {
                        "label": "Help and Support Center",
                        "name": "help_and_support_center"
                    },
                    {
                        "separator": true
                    },
                    {
                        "label": "Is this copy of Windows legal?",
                        "name": "is_this_copy_legal"
                    },
                    {
                        "label": "About Windows",
                        "name": "about_windows"
                    }
                ],
                customize
            }
    
            return optionsByTab[tabName]
        } catch(err) {
            console.log("The error is: ", err);
        }
    }

    const handleTabClick = (tabName, ev) => {
        ev.preventDefault();
        const options = getTabOptions(tabName);
        const tabElement = jQuery(`.tabname_${tabName}`)[0]
        const elementProperties = tabElement.getBoundingClientRect();

        let y = elementProperties.bottom;
        let x = elementProperties.left;

        menu({x, y, options});
    }

</script>

<div class="command_bar">
    <div class="tabs_part">
        {#each settingsTabNames as tabName}
            <button class="single_tab_button tabname_{tabName}" on:click={(ev) => handleTabClick(tabName, ev)}>
                {tabConfigs[tabName].label}
            </button>
        {/each}
    </div>
</div>

<style>
    .command_bar {
        display: flex;
		pointer-events: auto;
        /* background-color: var(--command_bar_bg);
        border-bottom: var(--command_bar_bottom);
        border-top: var(--command_bar_top);
        border-left: var(--command_bar_left);
        border-right: var(--command_bar_right); */
    }

    .tabs_part {
        display: flex;
    }

    .single_tab_button {
        font-size: 1rem;
        padding: .35rem .8rem;
        margin: .15rem;
    }

    /* .single_tab_button:hover {
        background-color: var(--hovered_item_bg);
        color: var(--hovered_item_color)
    } */
</style>