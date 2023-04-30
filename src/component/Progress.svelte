<script lang="ts">
  import { resultListStore } from "../stores";
	import type { Unsubscriber } from "svelte/store";
	import { onDestroy } from "svelte";
  import { RESULT } from "../data/const";

  let numerator:   number = 0;  // 分子
  let denominator: number = 0;  // 分母
  let percentage:  string = "0";

  const unsubscribe: Unsubscriber = resultListStore.subscribe(resultList => {
    if (resultList == undefined) return;

    numerator = 0;
    denominator = resultList.length;

    for (let result of resultList) {
      if (result["result"] != RESULT.UNDECIDED) {
        numerator++;
      }
    }
    percentage = (numerator / denominator * 100).toFixed(0);
  });
  onDestroy(unsubscribe);
</script>

<span>
  <p>Progress</p>
  <progress max={denominator} value={numerator}></progress>
  <div class="label">{numerator} / {denominator} [{percentage}%]</div>
</span>

<style>
  progress {
    height: 50px;
    width: 100%;
  }
</style>