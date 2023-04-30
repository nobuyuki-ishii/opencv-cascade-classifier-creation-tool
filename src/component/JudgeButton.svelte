<script lang="ts">
  import { selectedIndexStore, resultListStore, saveResultListStore } from "../stores";
  import { changePicture } from "../lib/common";
  import { RESULT } from "../data/const";

  $: buttonText = $resultListStore == undefined || $selectedIndexStore == undefined || $resultListStore[$selectedIndexStore]["rectList"].length == 0 ? "Negative" : "Positive";
  $: buttonClass = $resultListStore == undefined || $selectedIndexStore == undefined || $resultListStore[$selectedIndexStore]["rectList"].length == 0 ? "ui button red huge" : "ui button blue huge";

  function judge(): void {
    $resultListStore[$selectedIndexStore]["result"] = $resultListStore[$selectedIndexStore]["rectList"].length > 0 ? RESULT.POSITIVE : RESULT.NEGATIVE;
    $resultListStore[$selectedIndexStore]["fileName"] = getSelectedPictureFileName();
    saveResultListStore();

    // 次の写真へ
    changePicture(1);
  }

  function getSelectedPictureFileName(): string {
    const filePath: any = $resultListStore[$selectedIndexStore]["filePath"].split("/");
    return filePath[filePath.length - 1];
  }

</script>

<span>
  <button class={buttonClass} on:click={judge}>{buttonText}</button>
</span>

<style>
  button {
    width: 160px;
  }
</style>