<script lang="ts">
  import { changePicture } from "../lib/common";
	import { saveSelectedIndexStore } from "../stores";

  function prev(): void {
    changePicture(-1);
    saveSelectedIndexStore();
  }
</script>

<span>
  <button class="ui left labeled icon button" on:click={prev}>
    <i class="left arrow icon"></i>
    Prev
  </button>
</span>

<style>
</style>