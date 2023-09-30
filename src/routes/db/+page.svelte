<script>
	import { writable } from "svelte/store";
  import { onMount } from "svelte";
  /** @type {import('./$types').PageData} */
  export let data;

  const sql = writable('');
  var error = null;
  var tables = [];
  onMount(async () => {
    $sql = localStorage.getItem('tempSQL') ?? 'SELECT * FROM ';
    sql.subscribe(value => {
      localStorage.setItem('tempSQL',value);
    });
    tables = data.tables
  });
  

  var requestResult = null;
  export const dbRequest = async function (sqlRequest){
    $sql = sqlRequest
    requestResult = null;
    error = null;
    let req = await fetch('/api/db', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({sql : sqlRequest})
    })
    let res = await req.json();
    if(res.err){
      error = res.err;
    }else{
      requestResult = res;
    }
    return res;
  }
</script>


<h1>DB manager</h1>

<div class="row">
  {#each tables as table}
    <button type="button" on:click={() => dbRequest('SELECT * FROM '+table.name)}>{table.name}</button>
  {/each}
</div>
<form method="POST" target="/api/">
  <textarea name="sql" rows="10" cols="80" bind:value={$sql}></textarea><br/>
  <div class="row">
    <button type="button" id="btn-send" on:click={() => dbRequest($sql)}>Exécuter</button>
    {#if error}
      <span class="error">{error}</span>
    {/if}
  </div>
</form>

{#if requestResult}
  {#if requestResult[0]}
    <table>
      <thead>
        <tr>
          {#each Object.keys(requestResult[0]) as key}
            <th>{key}</th>
          {/each}
        </tr>
      </thead>
      <tbody>
      {#each requestResult as results}
        <tr>
          {#each Object.values(results) as value}
            <td>{value}</td>
          {/each}
        </tr>
      {/each}
      </tbody>
    </table>
  {:else}
    <p>Aucune donnée pour la requête</p>
  {/if}
{/if}

<style>
  table {
    border-collapse: collapse;
    margin: 5px 0px;
    width: 100%;
  }

  th, td {
    text-align: left;
    padding: 6px;
    border: #f2f2f200 1px solid;
    background-color: rgb(182, 182, 190);
    color: black;
  }

  tr:hover td{
    background-color: rgb(219, 219, 228);
  }

  th {
    background-color: #0d1131;
    color: white;
  }

  button {
    border: none;
    padding: 6px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 5px;
  }

  #btn-send{
    color: white;
    background-color: #4CAF50;
  }
  #btn-send:hover{
    background-color: #3e8e41;
  }

  textarea {
    width: 100%;
    margin: 0px 2px;
    height: 200px;
    padding: 6px 8px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 5px;
  }

  .error {
    color: red;
    background-color: #140000;
    padding: 10px;
    border-radius: 5px;
  }

  .row{
    display: flex;
    flex-direction: row;
  }
</style>