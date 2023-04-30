<script lang="ts">
	import { inputFilePathStore, resultListStore, saveResultListStore, saveSelectedIndexStore, selectedIndexStore, storeAllClear } from "../../stores";
  import { RESULT } from "../../data/const";

  const placeholder: string = "http://example.com/images/xxxxx.jpg\nhttp://example.com/images/yyyyy.jpg"

  function read(): void {
    // 再読み込みのチェック
    if ($resultListStore != undefined && $resultListStore.length > 0) {
      if (!window.confirm("再読み込みしたデータで初期化します。よろしいですか？")) {
        // cancelの場合、終わり
        return;
      }
    }

    const fileDataList: any = [];
    for (let filePath of $inputFilePathStore.split("\n")) {
      if (filePath == '') continue;
      // ファイルパス, 判定（’undecided’ or 'positive' or 'negative'）, ファイル名, positiveの四角情報
      fileDataList.push({filePath: filePath, result: RESULT.UNDECIDED, fileName: '', rectList: []});
    }
    resultListStore.set(fileDataList);
    $selectedIndexStore = 0;
    saveResultListStore();
    saveSelectedIndexStore();
  }

  function sampleData(): void {
    $inputFilePathStore = "http://141-lab.com/ruru_api/images/20230223195939.jpg\nhttp://141-lab.com/ruru_api/images/20230223195949.jpg\nhttp://141-lab.com/ruru_api/images/20230223195959.jpg";
    read();
  }

  function clear(): void {
    if (window.confirm("作業中のデータをクリアします。よろしいですか？")) {
      storeAllClear();
    }
  }
</script>

<div class="ui grid">
  <div class="one wide column"></div>
  <div class="fourteen wide column">
    <div class="ui form">
      <div class="field">
        <label>File pathes</label>
        <textarea id="textarea" bind:value={$inputFilePathStore} placeholder={placeholder}></textarea>
      </div>
      <button class="ui button" on:click={read}>Read</button>
      <button class="ui button" on:click={clear}>Data Clear</button>
      <button class="ui button" on:click={sampleData}>Sample Data</button>
    </div>
  </div>
  <div class="one wide column"></div>
</div>

<style>
</style>