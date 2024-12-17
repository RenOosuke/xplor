<script>
    const settingsTabNames = [
        `file`,
        `edit`,
        `view`,
        `favorites`,
        `tools`,
        `help`
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
    }
    
    const getTabOptions = (tabName) => {
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
                    "options": []
                },
                {
                    "label": "Status Bar",
                    "name": "status_bar"
                },
                {
                    "label": "Explorer Bar",
                    "name": "explorer_bar",
                    "options": []
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
                    "options": []
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
                    "options": []
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
        }

        return optionsByTab[tabName]
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

<div class="top_settings_bar">
    <div class="tabs_part">
        {#each settingsTabNames as tabName}
            <button class="single_tab_button tabname_{tabName}" on:click={(ev) => handleTabClick(tabName, ev)}>
                {tabConfigs[tabName].label}
            </button>
        {/each}
    </div>
</div>

<style>
    .top_settings_bar {
        display: flex;
        background-color: var(--top_settings_bar_bg);
    }

    .tabs_part {
        display: flex;
    }

    .single_tab_button {
        font-size: 1rem;
        padding: .35rem .8rem;
    }

    .single_tab_button:hover {
        background-color: var(--hovered_item_bg);
        color: var(--hovered_item_color)
    }
</style>