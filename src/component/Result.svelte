<script lang="ts">
  import { selectedIndexStore, resultListStore } from "../stores";
	import type { Unsubscriber } from "svelte/store";
	import { onDestroy } from "svelte";
  import { RESULT } from "../data/const";

  let labelText: string = "";
  let labelClass: string = "";

  function changeResult(): void {
    if ($resultListStore == undefined) return;
    if ($resultListStore[$selectedIndexStore]["result"] == RESULT.POSITIVE) {
      // positive
      labelText = "Positive";
      labelClass = "ui label blue large";
    } else if ($resultListStore[$selectedIndexStore]["result"] == RESULT.NEGATIVE) {
      // negative
      labelText = "Negative";
      labelClass = "ui label red large";
    } else {
      // 未判定
      labelText = "Undecided";
      labelClass = "ui label green large";
    }
  }

  let unsubscribe: Unsubscriber = selectedIndexStore.subscribe(selectedIndex => {
    if (selectedIndex == undefined) return;
    changeResult();
  });
  onDestroy(unsubscribe);

  unsubscribe = resultListStore.subscribe(resultList => {
    if (resultList == undefined) return;
    changeResult();
  });
  onDestroy(unsubscribe);

</script>

<span>
  <p>Result</p>
  <div class="{labelClass}">{labelText}</div>
</span>

<style>
</style>