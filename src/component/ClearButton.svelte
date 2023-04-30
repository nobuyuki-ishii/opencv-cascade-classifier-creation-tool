<script lang="ts">
  import { selectedIndexStore, resultListStore, saveResultListStore } from "../stores";
  import { RESULT } from "../data/const";

  function clear(): void {
    const svg: any = document.querySelector("#svg-" + $selectedIndexStore);
    if (svg == null || svg.firstChild == null) return;

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    $resultListStore[$selectedIndexStore]["result"] = RESULT.UNDECIDED;
    $resultListStore[$selectedIndexStore]["rectList"] = [];
    saveResultListStore();
  }
</script>

<span>
  <button class="ui button" on:click={clear}>Clear</button>
</span>

<style>

</style>