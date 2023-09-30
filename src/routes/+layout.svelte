<script>
	import Navbar from "$lib/Navbar.svelte";
</script>

<svelte:head>
  <title>Squidit</title>
</svelte:head>

<div id="body">
  <div id="navbar">
    <Navbar />
  </div>
  <main>
    <slot />
  </main>
</div>

<style>
  #navbar {
    width: 200px;
    height: 100vh;
  }
  #body {
    font-family: Arial, Helvetica, sans-serif;
    display: flex;
    height: 100%;
  }
  main {
    padding: 10px;
    background: #27272e;
    overflow-x: hidden;
    color: white;
    width: calc(100vw - 200px);
  }
</style>