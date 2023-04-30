<script lang="ts">
	import { onDestroy } from "svelte";
	import type { Unsubscriber } from "svelte/store";
  import { resultListStore, selectedIndexStore, selectedBeforeIndexStore } from "../stores";

  let max: number = 1;
  let value: number = 1;
  
  let unsubscribe: Unsubscriber = resultListStore.subscribe(resultList => {
    if (resultList == undefined) return;
    max = resultList.length;
  });
  onDestroy(unsubscribe);

  unsubscribe = selectedIndexStore.subscribe(selectedIndex => {
    if (selectedIndex == undefined) return;

    if (selectedIndex >= 0) {
      value = Number(selectedIndex) + 1;
    }
  });
  onDestroy(unsubscribe);

  function numberChange(): void {
    if ($selectedIndexStore == undefined) return;

    if (value <= 0 || value > max) {
      value = $selectedIndexStore + 1;
      return;
    }

    $selectedBeforeIndexStore = $selectedIndexStore;
    $selectedIndexStore = value - 1;
  }
</script>

<span>
  <p>Picture number</p>
  <div class="ui form">
    <div class="field">
      <input id="picture-index" type="number" max={max} min="1" bind:value={value} on:change={numberChange}>
    </div>
  </div>
</span>

<style>
</style>