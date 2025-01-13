<script>
    import { onMount } from "svelte";
    let title = '';

    let isFullScreen = WindowManager.isFullScreen();

    const toggleFullScreen = () => {
        if(isFullScreen) {
            WindowManager.unmaximize()
        } else {
            console.log("IS MAXIMIZING");
            WindowManager.maximize();
        }
    };

    onMount(() => {
        WindowManager.onTitleChange = (newTitle) => {

        }

        document.addEventListener('nw_custom_resize', () => {
            isFullScreen = WindowManager.isFullScreen();
        });
    })
</script>

<div class="control_bar" id="drag-enable">
    <!--  -->
    <div class="">
        TODO (TABS)
    </div>
    <div  class="filler">

    </div>

    <div class="control_buttons">
        <button class="minimize_button control_button" id="drag-disable" on:click={() => WindowManager.minimize()}>
            <div class="primary_button_border"/>
            <div class="minimize_icon"/>
        </button>
        <button class="maximize_button control_button" id="drag-disable" on:click={() => toggleFullScreen()}>
            <div class="primary_button_border"/>
            <div class="{isFullScreen ? "unmaximize_icon" : "maximize_icon"}"/>
        </button>
        <button class="close_button control_button" id="drag-disable" on:click={() => WindowManager.windowPromptQuit()}>
            <div class="destructive_button_border"/>
            <div class="close_icon"/>
        </button>
    </div>
</div>

<style>
    .control_bar {
        width: 100%;
        display: flex;
        position: relative;
        z-index: 9;
        box-sizing: border-box;
		pointer-events: auto;
        /* height: var(--app_top_border_width);
        padding-left: var(--app_dragbar_left_margin);
        padding-right: var(--app_dragbar_right_margin); */
    }

    .filler {
        height: 100%;
        flex-grow: 1;
    }

    .control_buttons {
        display: flex;
        z-index: 10;
        /* height: var(--app_control_buttons_height);
        margin-top: var(--app_control_buttons_margin_top);
        margin-bottom: var(--app_control_buttons_margin_bottom); */
    }
    
    .control_button {
        height: 100%;
        z-index: 10000;
        position: relative;
        box-sizing: border-box;
        /* border: solid 1px; */
    }

    .minimize_icon, .primary_button_border, .destructive_button_border, .maximize_icon, .unmaximize_icon, .close_icon{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-size: cover;
    }
    
    /* .minimize_icon {
        background: var(--app_minimize_icon);
    }

    .maximize_icon {
        background: var(--app_maximize_icon);
    }

    .unmaximize_icon {
        background: var(--app_unmaximize_icon);
    }

    .close_icon {
        background: var(--app_close_icon);
    } */

    /* .minimize_button:hover .primary_button_border, .maximize_button:hover .primary_button_border {
        background: var(--app_control_button_primary_outer_border_hovered);
    } */

    .primary_button_border {
        background-size: cover;
        /* background: var(--app_control_button_primary_outer_border); */
    }

    .destructive_button_border {
        background-size: cover;
        /* background: var(--app_control_button_destructive_outer_border); */
    }
    
    .close_button:hover {
        /* background: var(--app_control_button_destructive_outer_border_hovered); */
    }
    


    /* .control_button:not(:last-child) {
        margin-right: var(--app_control_button_margin);
    }

    .minimize_button {
        width: var(--app_minimize_button_width);
        border-radius: var(--app_close_border_radius);
    }

    .minimize_button .element_border_highlight::after {
        border-radius: var(--app_minimize_border_radius);
    }
    
    .minimize_button, .maximize_button {
        background: var(--app_primary_button_bg);
    }

    .minimize_button:hover, .maximize_button:hover {
        background: var(--app_primary_button_hovered_bg);
    }

    .minimize_button:active, .maximize_button:active {
        background: var(--app_primary_button_active_bg);
    }
    
    .maximize_button::after {
        background: var(--app_control_button_primary_outer_border);
    }

    .maximize_button {
        width: var(--app_maximize_button_width);
        border-radius: var(--app_close_border_radius);
    }

    .maximize_button::after {
        border-radius: var(--app_maximize_border_radius);
    }

    .close_button {
        width: var(--app_close_button_width);
        background: var(--app_destructive_button_bg);
        border-radius: var(--app_close_border_radius);
    }
    
    .close_button:hover {
        background: var(--app_destructive_button_hovered_bg);
    }

    .close_button:active {
        background: var(--app_destructive_button_active_bg);
    }

    .close_button::after {
        background: var(--app_control_button_destructive_outer_border);
        border-radius: var(--app_close_border_radius);
    } */
</style>