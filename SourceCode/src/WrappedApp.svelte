<script>
    import { onMount } from "svelte";
    import AppBorder from "./essentials/AppBorder.svelte";
	import App from "./essentials/App.svelte";

	let hasFrame = true;
	let hasAero = false;

	onMount(() => {
		hasFrame = APP_WINDOW.frame
		hasAero = APP_WINDOW.aero
	}) 
</script>


<AppBorder></AppBorder>

<div class="appmain {!hasFrame ? "frameless" : ''}">
	<App></App>
</div>


<style>
	/* .frameless {
		padding-left: var(--app_vertical_border_width);
		padding-right: var(--app_vertical_border_width);
		padding-bottom: var(--app_horizontal_border_width);
		padding-top: var(--app_top_border_width);
		height: calc(100% - var(--app_horizontal_border_width) - var(--app_top_border_width));
	} */

	:global(#drag-enable) {
		-webkit-app-region: drag;
	}

	:global(#drag-disable) {
        -webkit-app-region: no-drag;
    }
	
	.appmain {
		z-index: 3;
		position: relative;
		pointer-events: none;
		display: flex;
		flex-direction: column;
	}
</style>