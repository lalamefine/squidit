<script lang="ts">
  import type Host from '$lib/models/Host';
  export let host : Host;
  // your script goes here
  let statusClass = 's-unreachable';
</script>

<div class="col-6">
  <div class="card flex-column">
    <div class="flex-row justify-between">
      <h4>{host.name}</h4>
      <span class="status {statusClass}"></span>
    </div>
    <div class="content">
      Unreachable
    </div>
  </div>
</div>
<style>
  .card{
    background-color: #fff1;
    border-radius: 5px;
    box-shadow: 0 0.1rem 0.25rem rgba(0, 0, 0, 0.15);
    padding: 10px;
    margin: 0.5rem;
    width: 400px;
  }
  .content{
    margin: -10px;
    margin-top: 5px;
    border-radius: 5px;
    background-color:#645e6e;
    color:  #ffffff;
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
  .s-error{
    background-color: #ff0000;
  }
  .s-installing{
    background-color: #ff8c00;
  }
  .s-ready{
    background-color: #066806;
  }
</style>