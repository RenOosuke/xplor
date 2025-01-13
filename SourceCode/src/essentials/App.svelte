<script>
  import Menu from "./WrappedMenu.svelte";
  import CommandBar from "./CommandBar.svelte";
  import { onMount } from "svelte";
  import Toolbar from "./Toolbar.svelte";
  import NavigationPane from "./NavigationPane.svelte";
  import InternalAppBorder from "../components/general/InternalBorder.svelte";
  const nw = window.nw;

  const { require } = window.nw;
  onMount(() => {
    window.menu = (menuProps) => {
      let modalContainer = jQuery("body")[0];

      const modal = new Menu({
        target: modalContainer,
        props: spreader(menuProps, {
          hide: () => {
            modal.$destroy();
          },
        }),
      });
    };
  });
</script>

<InternalAppBorder></InternalAppBorder>
<CommandBar></CommandBar>
<Toolbar></Toolbar>

<div class="nav_pane_and_file_grid">
  <NavigationPane></NavigationPane>
</div>

<style>
  main {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .nav_pane_and_file_grid {
    /* height: ; */
    flex-grow: 1;
    display: flex;
  }
</style>
