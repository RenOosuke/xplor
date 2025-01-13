<script>
    import { onMount } from "svelte";

    // No changes to the script logic for now

    import WindowDragBar from "../components/WindowDragBar.svelte";

    onMount(() => {
        // nw.Window.get().zoomLevel=5
    })
</script>

<div class="border_shadow">
    <div class="outer_border"></div>
    
    <div class="app_borders">
        <WindowDragBar></WindowDragBar>
<!-- 
        <div class="dark_outer_border_placeholder">
            <div class="dark_outer_border"></div>
        </div> -->

        <div class="color_layer"></div>
        <!-- Texture Layer -->
        <div class="texture_layer" style="background-size: cover;"></div>

    </div>
</div>

<style>
    /* Outer container for the app borders */
    .app_borders, .outer_border{
        position: absolute;
        border: none;
        height: 100%;
        width: 100%;
        overflow: hidden;
        z-index: 0;
        /* border-image: var(--app_dark_outer_border); */
        /* border-image-slice: 1;  */
        box-sizing: border-box;
        display: inline-block;
        /* border-radius: var(--app_border_radius); */
    }

    .app_borders {
        border: solid transparent 1.7px;
    }

    .outer_border::after {
        content: "";
        position: absolute;
        inset: 0;
        /* padding: var(--app_dark_outer_border_width);
        background: var(--app_dark_outer_border);
        border-radius: var(--app_border_radius); */

        -webkit-mask: linear-gradient(black, black) content-box, linear-gradient(white, white);
        -webkit-mask-composite: xor;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
    }
    
    /* .dark_outer_border_placeholder {
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .dark_outer_border {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .dark_outer_border::after {
        position: absolute;
        top: 0;
        left: 0;
        background: var(--app_dark_outer_border_bg);
        background: var(--app_dark_outer_border);
        content: "";
        width: 100%;
        height: 100%;
    } */

    /* Texture layer for the frosted glass effect */
    .texture_layer {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /* Behind the color layer */
        /* background-image: var(--app_window_texture); */
        background-size: cover; /* Cover entire area */
        background-repeat: no-repeat;
        /* -webkit-filter: var(--app_texture_blur);
        filter: var(--app_texture_blur);  */
        backdrop-filter: blur(5px);
    }

    /* Solid color layer for the accent color */
    .color_layer {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2; /* In front of the texture layer */
        /* background: var(--app_window_color); */
        /* -webkit-filter: var(--app_color_blur);  */
        /* Apply a lighter blur to the color */
        /* filter: var(--app_color_blur);  */
        /* Non-Webkit fallback */
        /* border-radius: var(--app_border_radius); */

        /* border: solid .2rem black; */
        /* border: solid .2rem transparent;
        border-image: var(--app_light_outer_border);
        border-image-slice: 1;  */
        box-sizing: border-box;
    }


    .color_layer::after {
        content: "";
        position: absolute;
        inset: 0;
        /* width: 20rem;
        height: 20rem; */
        /* padding: var(--app_light_outer_border_width);
        background: var(--app_light_outer_border);
        border-radius: calc(var(--app_border_radius) - .1rem); */

        -webkit-mask: linear-gradient(black, black) content-box, linear-gradient(white, white);
        /* -webkit-mask-composite: destination-in;  */
        /* Use destination-in for replacing the border */
        -webkit-mask-composite: xor;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        display: flex;
    }

    /* Shadow around the border */
    .border_shadow {
        position: absolute;
        height: 100%;
        width: 100%;
        /* box-shadow: var(--app_shadow); */
		pointer-events: none;
        z-index: 0;
    }
</style>
