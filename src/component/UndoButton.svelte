<script lang="ts">
  import { selectedIndexStore, resultListStore, saveResultListStore } from "../stores";
  import { RESULT } from "../data/const";

  function undo(): void {
    const svg: any = document.querySelector("#svg-" + $selectedIndexStore);
    if (svg == null || svg.firstChild == null) return;

    svg.removeChild(svg.lastChild);
    $resultListStore[$selectedIndexStore]["rectList"].pop();
    $resultListStore[$selectedIndexStore]["result"] = RESULT.UNDECIDED;
    $resultListStore = $resultListStore;
    saveResultListStore();
  }
</script>

<span>
  <button class="ui button" on:click={undo}>Undo</button>
</span>

<style>

</style>