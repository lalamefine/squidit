<script lang="ts">
  import type Host from '$lib/models/Host';
  import ConsoleLine from "svelte-material-icons/ConsoleLine.svelte";
  import Delete from "svelte-material-icons/Delete.svelte";
	import Modal,{getModal}  from '$lib/components/Modal.svelte';
	import SshInterface from './SshInterface.svelte';
  export let host : Host;
  // your script goes here
  let status = 'unknown';
  let modalHost: Host;

  function openConsoleModal(host: Host){
    modalHost = host;
    getModal('consoleModal'+host.id).open();
  }

  function deleteHost(host: Host){
    if(confirm("Are you sure you want to delete this host("+(host.name??'')+") ?"))
      console.log("Deleting host with id: " + host.id);
  }

</script>

<div class="col-6">
  <div class="card flex-column">
    <div class="flex-row justify-between">
      <h4>{host.name}</h4>
      <span class="status {'s-'+status}"></span>
    </div>
    <div class="content">
      
      
    </div>
    <div class="flex-row-reverse">
      <button on:click={()=>deleteHost(host)} class="red-hover"><Delete/></button>
      {#if status != 'unreachable' && status != 'unknown'}
        <button on:click={()=>openConsoleModal(host)}><ConsoleLine/></button>
      {/if}
    </div>
  </div>
  <Modal id={'consoleModal'+host.id}>
    <h4 slot="title">
      {host.name}
    </h4>
    <div slot="content">
      <SshInterface {host}/>
    </div>
  </Modal>
</div>


<style> 
  button{
    background-color: rgba(255, 255, 255, 0.267);
    border: none;
    border-radius: 5px;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
    margin: 0 5px;
    padding: 3px 10px;
  }
  button:hover{
    background-color: #fff2;
  }
  .red-hover:hover{
    background-color: #a00000;
  }
  .card{
    background-color: #fff1;
    border-radius: 5px;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    padding: 10px 10px 5px 10px ;
    margin: 0.5rem;
    width: 400px;
  }
  .content{
    margin: 5px -5px;
    border-radius: 5px;
    background-color: #645f6e;
    color:  #ffffff;
    box-shadow: inset 0 0rem 0.5rem rgba(0, 0, 0, 0.25);
    padding: 0.5rem 1rem;
  }
  .flex-column{
    display: flex;
    flex-direction: column;
  }
  .flex-row{
    display: flex;
    flex-direction: row;
  }
  .flex-row-reverse{
    display: flex;
    flex-direction: row-reverse;
  }
  .justify-between{
    justify-content: space-between;
  }
  h4{
    margin: 0;
  }
  .status{
    border-radius: 50%;
    display: inline-block;
    height: 0.75rem;
    margin-left: 0.5rem;
    width: 0.75rem;
  }
  .s-unreachable{
    background-color: #a00000;
  }
  .s-reachable{
    background-color: #066806;
  }
  .s-installing{
    background-color: #ff8c00;
  }
  .s-unknown{
    background-color: #999;
  }
</style>