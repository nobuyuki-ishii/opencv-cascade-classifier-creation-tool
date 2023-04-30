<script lang="ts">
	import { positiveListPathStore, resultListStore } from "../../stores";
  import { FILE_NAME } from "../../data/const";
  import { getNegativeCount, getPositiveCount } from "../../lib/common";

  $: commandCreatesamples = commandCreatesamplesText();
  $: commandTraincascade = commandTraincascadeText();

  function commandCreatesamplesText(): string {
    // sample
    // ./opencv_createsamples -info pos/poslist.txt -vec vec/posvec.vec
    const cmd: string = "opencv_createsamples -info " + $positiveListPathStore + FILE_NAME.POSITIVE_LIST + " -vec ./" + FILE_NAME.POSITIVE_VECTOR;
    return cmd;
  }

  function commandTraincascadeText(): string {
    // sample
    // opencv_traincascade.exe -data cascade -vec vec/positive.vec -bg neg/neglist.txt -numPos 70 -numNeg 60
    const cmd: string = "opencv_traincascade -data ./cascade -vec ./" + FILE_NAME.POSITIVE_VECTOR + " -bg ./" + FILE_NAME.NEGATIVE_LIST  + " -numPos " + String(getPositiveCount()) + " -numNeg " + String(getNegativeCount());
    return cmd;
  }

  function clipboardCreatesamples(): void {
    const taTag: any = document.querySelector("#textareaCreatesamples");
    const msg: any = taTag.value;
    navigator.clipboard.writeText(msg);
  }

  function clipboardTraincascade(): void {
    const taTag: any = document.querySelector("#textareaTraincascade");
    const msg: any = taTag.value;
    navigator.clipboard.writeText(msg);
  }
</script>

<div class="ui grid">
  <div class="one wide column"></div>
  <div class="fourteen wide column">
    <div class="ui form">
      <div class="field">
        <label>Command Sample</label>
        <textarea id="textareaCreatesamples" readonly rows="1">{commandCreatesamples}</textarea>
        <button class="ui button top-space-10" on:click={clipboardCreatesamples}>Clipboard</button>
        <div class="top-space-20"></div>
        <textarea id="textareaTraincascade" readonly rows="1">{commandTraincascade}</textarea>
        <button class="ui button top-space-10" on:click={clipboardTraincascade}>Clipboard</button>
      </div>
    </div>
  </div>
  <div class="one wide column"></div>
</div>

<style>
  .top-space-10 {
    margin-top: 10px;
  }

  .top-space-20 {
    margin-top: 20px;
  }
</style>