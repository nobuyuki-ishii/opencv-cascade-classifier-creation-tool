<script lang="ts">
	import { positiveListPathStore, resultListStore } from "../../stores";
	import type { Unsubscriber } from "svelte/store";
	import { onDestroy } from "svelte";
  import { RESULT, FILE_NAME } from "../../data/const";
  import { savePositiveListPath } from "../../stores";

  let positiveList: string = "";

  let unsubscribe: Unsubscriber = resultListStore.subscribe(value => {
    update();
  });
  onDestroy(unsubscribe);

  unsubscribe = positiveListPathStore.subscribe(value => {
    update();
    savePositiveListPath();
  });
  onDestroy(unsubscribe);

  function update(): void {
    if ($resultListStore == undefined) return;

    positiveList = "";
    for (const result of $resultListStore) {
      // 未判定またはnegativeはスキップ
      if (result["result"] != RESULT.POSITIVE) continue;
      positiveList += $positiveListPathStore + result["fileName"] + " " + result["rectList"].length;
      for (let rect of result["rectList"]) {
        positiveList += " " + rect.join(" ");
      }
      positiveList += "\n";
    }
  }

  function download(): void {
    const dlTag: any = document.querySelector("#dla");
  
    const taTag: any = document.querySelector("#textarea");
    const msg: any = taTag.value;

    const blob: Blob = new Blob([msg], { type: "octet/stream" });
    const url: string = window.URL.createObjectURL(blob);
    dlTag.href = url;
    dlTag.download = FILE_NAME.POSITIVE_LIST;
    dlTag.click();
    window.URL.revokeObjectURL(url);
  }

  function clipboard(): void {
    const taTag: any = document.querySelector("#textarea");
    const msg: any = taTag.value;
    navigator.clipboard.writeText(msg);
  }
</script>

<div class="ui grid">
  <div class="one wide column"></div>
  <div class="fourteen wide column">
    <div class="ui form">
      <div class="field">
        <label>Positive List File Path</label>
        <input type="text" name="first-name" bind:value={$positiveListPathStore}>
      </div>
      <div class="field">
        <label>Positive List</label>
        <textarea id="textarea" readonly>{positiveList}</textarea>
        <a id="dla"></a>
      </div>
      <button class="ui button" on:click={download}>Download</button>
      <button class="ui button" on:click={clipboard}>Clipboard</button>
    </div>
  </div>
  <div class="one wide column"></div>
</div>

<style>
</style>