<script lang="ts">
  import type Host from "$lib/models/Host";
  import Send from "svelte-material-icons/Send.svelte";
  export let host : Host;
</script>

<div id="main">
  <p>
    Unreachable
  </p>
  <div class="row">
    <input type="text"/>
    <button><Send/></button>
  </div>
</div>

<style>
  p{
    font-size: 0.8rem;
    margin: 5px;
    max-height: 70vh;
    overflow-y: auto;
  }
  input[type="text"]{
    border: none;
    flex-grow: 1;
    border-radius: 5px;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    color: #ffffff;
    background-color: #27272e;
    font-size: 0.8rem;
    padding: 3px 10px;
  }
  input[type="text"]:focus{
    outline: none;
  }
  button{
    background-color: #27272e;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
    padding: 3px 10px;
    margin-left: 5px;
    display: flex;
    align-items: center;
  }
  button:hover{
    background-color: #3a3a42;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
</style>