<script lang="ts">
  import { changePicture } from "../lib/common";
	import { saveSelectedIndexStore } from "../stores";

  function next(): void {
    changePicture(1);
    saveSelectedIndexStore();
  }
</script>

<span>
  <button class="ui right labeled icon button" on:click={next}>
    <i class="right arrow icon"></i>
    Next
  </button>
</span>

<style>
</style>