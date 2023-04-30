<script lang="ts">
	import type { Unsubscriber } from "svelte/store";
	import { onDestroy } from "svelte";
  import { resultListStore, selectedIndexStore } from "../stores";

  let rectText: string = "";

  let unsubscribe: Unsubscriber = resultListStore.subscribe(resultList => {
    setRectPoint();
  });
  onDestroy(unsubscribe);

  unsubscribe = selectedIndexStore.subscribe(selectedIndex => {
    setRectPoint();
  });
  onDestroy(unsubscribe);

  function setRectPoint(): void {
    if ($resultListStore == undefined || $selectedIndexStore == undefined) return;
    rectText = "";
    for (let rect of $resultListStore[$selectedIndexStore]["rectList"]) {
      rectText = rectText + rect.join(" ") + "\n";
    }
  }

</script>

<span>
  <div class="ui form">
    <div class="field">
      <p>Position</p>
      <textarea readonly>{rectText}</textarea>
    </div>
  </div>
</span>

<style>
</style>