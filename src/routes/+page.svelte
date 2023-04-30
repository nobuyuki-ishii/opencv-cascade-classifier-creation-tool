<script lang="ts">
  import Picture from "../component/Picture.svelte";
  import JudgeButton from "../component/JudgeButton.svelte";
  import ClearButton from "../component/ClearButton.svelte";
  import UndoButton from "../component/UndoButton.svelte";
  import RectPosition from "../component/RectPosition.svelte";
  import Progress from "../component/Progress.svelte";
  import NextButton from "../component/NextButton.svelte";
  import PrevButton from "../component/PrevButton.svelte";
  import Result from "../component/Result.svelte";
  import PictureNumber from "../component/PictureNumber.svelte";
</script>

<div class="ui grid column-space">
  <div class="twelve wide column">
    <div class="container elm-space">
      <Picture />
    </div>
    <div class="container">
      <div>
        <PrevButton />
        <JudgeButton />
        <NextButton />
      </div>
    </div>
  </div>
  <div class="three wide column">
    <div class="elm-space">
      <Result />
    </div>
    <div class="elm-space">
      <RectPosition />
    </div>
    <div class="elm-space">
      <UndoButton />
      <ClearButton />
    </div>
    <div class="elm-space">
      <PictureNumber />
    </div>
    <div class="elm-space">
      <Progress />
    </div>
  </div>
  <div class="one wide column">
  </div>
</div>

<style>
  .elm-space {
    padding-bottom: 20px;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>