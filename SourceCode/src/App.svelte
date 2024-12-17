<script>
    import Menu from "./essentials/Menu.svelte";
	import TopSettingsBar from "./essentials/TopSettingsBar.svelte";
	import { onMount } from "svelte";


	export let name;
	const nw = window.nw;
	
	const { require } = window.nw;
	onMount(() => {
    window.menu = (menuProps) => {
      let modalContainer =
        document.getElementsByClassName("menu_placeholder")[0];

      const modal = new Menu({
        target: modalContainer,
        props: spreader(menuProps, {
          hide: () => {
            modal.$destroy();
          },
        }) 
      });
    };
  });

</script>

<main>
	<div class="menu_placeholder"></div>
	<TopSettingsBar></TopSettingsBar>
</main>

<style>
	h1 {
		color: #09ff00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>