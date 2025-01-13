<script>
    import { onMount } from "svelte";

    let sideGroups = [

    ]

    const navigationPaneThemeChange = (version, themeName) => {
        let favlinksLabel = '';

        switch(version) {
            case 'XP':
                favlinksLabel = 'Other Places';
            break
            case 'VISTA':
                favlinksLabel = 'Favorite Links'
            break;
        };

        const userHome = process.env.HOME || process.env.USERPROFILE;

        const directories = {
        documents: path.join(userHome, 'Documents'),
        pictures: path.join(userHome, 'Pictures'),
        music: path.join(userHome, 'Music'),
        desktop: path.join(userHome, 'Desktop'),
        downloads: path.join(userHome, 'Downloads'),
        };

        sideGroups = [
            {
                name: `favorite_links`,
                label: favlinksLabel,
                options: [
                    {
                        label: 'Documents',
                        name: 'documents',
                        path: directories.documents,
                    },
                    {
                        label: 'Pictures',
                        name: 'pictures',
                        path: directories.pictures,
                    },
                    {
                        label: 'Music',
                        name: 'music',
                        path: directories.music,
                    },
                    {
                        label: 'Desktop',
                        name: 'desktop',
                        path: directories.desktop,
                    },
                    {
                        label: 'Downloads',
                        name: 'downloads',
                        path: directories.downloads,
                    }
                ],
            },
        ];

        console.log(sideGroups);
    }

    themeUtils.themeChangeEvents.push(navigationPaneThemeChange)

    onMount(() => {
        TODO(`Settings for Navigation Pane tabs (whether to exclude "Details Panel", what favorite links to use, etc etc.)`)
        TODO(`Settings to add/get favorite links from user settings.`);

        if(sideGroups.length == 0) {
            navigationPaneThemeChange(themeUtils.version, themeUtils.selectedTheme);
        }
    })
</script>

<div class="navigation_pane">
    <!-- <img src="e:\Projects\Programming\JS\WINXP\XPlor\DevFiles\(MOST ICONS)windows_vista___icons_by_jojojo101_dfuuef8\Folders\Folder051.ico"/> -->
</div>

<style>
    @media (max-width: 640px) {
        .navigation_pane {
            max-width: 30% !important;
        }
	}

    .navigation_pane {
        max-width: 40%;
        width: 20rem;
        /* background-color: green; */
        /* background-image: var(--navigation_pane_bg); */
    }
</style>