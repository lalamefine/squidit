<script context="module" lang="ts">
	let onTop   //keeping track of which open modal is on top
	const modals={}  //all modals get registered here for easy future access
	
	// 	returns an object for the modal specified by `id`, which contains the API functions (`open` and `close` )
	export function getModal(id=''){
		return modals[id]
	}
</script>

<script lang="ts">
import {onDestroy} from 'svelte'
import Close from "svelte-material-icons/Close.svelte"
let topDiv
let visible=false
let prevOnTop
let closeCallback

export let id=''

function keyPress(ev){
	//only respond if the current modal is the top one
	if(ev.key=="Escape" && onTop==topDiv) close() //ESC
}

/**  API **/
function open(callback){
	closeCallback=callback
	if(visible) return
	prevOnTop=onTop
	onTop=topDiv	
	//this prevents scrolling of the main window on larger screens
	document.body.style.overflow="hidden" 
	visible=true
	//Move the modal in the DOM to be the last child of <BODY> so that it can be on top of everything
	document.body.appendChild(topDiv)
}
	
function close(retVal = null){
	if(!visible) return
	onTop=prevOnTop
	if(onTop==null) document.body.style.overflow=""
	visible=false
	if(closeCallback) closeCallback(retVal)
}
	
//expose the API
modals[id]={open,close}
	
onDestroy(()=>{
	delete modals[id]
})
</script>

<div id="topModal" class:visible on:keypress={keyPress} bind:this={topDiv} on:click={()=>close()}>
	<div id='modal' on:click|stopPropagation={()=>{}} on:keypress={()=>{}}>
		<div id="modal-header">
			<slot name="title"></slot>
			<span id="close" on:click={()=>close()} on:keypress={()=>close()}><Close/></span>
		</div>
		<div id='modal-content'>
			<slot name="content"></slot>
		</div>
	</div>
</div>

<style>
	#topModal {
		visibility: hidden;
		z-index: 9999;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* background: rgba(34, 34, 34, 0.788); */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#modal {
		position: relative;
		font-family: Arial, Helvetica, sans-serif;
		border-radius: 5px;
		min-width: 500px;
		background: #1d1e27;
	}
	#close {
		cursor: pointer;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	#close:hover {
		background-color: red;
	}

	.visible {
		visibility: visible !important;
	}

	#modal-content {
		background: white;
		padding: 8px;
		margin: 2px;
		border-radius: 5px;
		max-width: calc(100vw - 20px);
		max-height: calc(100vh - 20px);
		overflow: auto;
	}
	#modal-header {
		padding: 5px 10px;
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>