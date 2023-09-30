<script>
  import HostCard from '$lib/components/HostCard.svelte';
  /** @type {import('./$types').PageData} */
  export let data;
  // your script goes here
</script>

<div class="row">
  <button>+</button>
</div>
<div class="row">
  {#each data.hosts as host}
    <HostCard {host} />
  {/each}
</div>

<style>
  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  button{
    background-color: #fff1;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    color: #645e6e;
    cursor: pointer;
    font-size: 1.5rem;
    height: 2rem;
    width: 2rem;
  }
  button:hover{
    background-color: #fff2;
  }
</style>