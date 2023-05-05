<script lang="ts">
  import { base } from "$app/paths";
  import { resultListStore } from "../stores";
	import type { Unsubscriber } from "svelte/store";
	import { onDestroy, afterUpdate } from "svelte";
  import { getPositiveCount, getNegativeCount } from "../lib/common";

  let positiveCount: number = 0;
  let negativeCount: number = 0;

  let isPositiveShow: string = "no-display";
  let isNegativeShow: string = "no-display";

  let isHomeActive: string = "active";
  let isImportActive: string = "";
  let isPositiveActive: string = "";
  let isNegativeActive: string = "";
  let isCommandActive: string = "";
  let isAboutActive: string = "";

  afterUpdate(() => {
    clearMenu();
    const path = location.pathname;
    if (path.match(/import/)) {
      isImportActive = "active";
    } else if (path.match(/positive/)) {
      isPositiveActive = "active";
    } else if (path.match(/negative/)) {
      isNegativeActive = "active";
    } else if (path.match(/command/)) {
      isCommandActive = "active";
    } else if (path.match(/about/)) {
      isAboutActive = "active";
    } else {
      isHomeActive = "active";
    }
  });

  function clearMenu(): void {
    isHomeActive = "";
    isImportActive = "";
    isPositiveActive = "";
    isNegativeActive = "";
    isCommandActive = "";
    isAboutActive = "";
  }

  const unsubscribe: Unsubscriber = resultListStore.subscribe(resultList => {
    positiveCount = getPositiveCount();
    negativeCount = getNegativeCount();

    isPositiveShow = positiveCount > 0 ? "" : "no-display";
    isNegativeShow = negativeCount > 0 ? "" : "no-display";
  });
  onDestroy(unsubscribe);
</script>

<div class="container">
  <strong class="title-space">OpenCV cascade classfier creation tool</strong>
  <div class="ui compact menu">
    <a class="item {isHomeActive}" href="{base}/">
      Home
    </a>
    <a class="item {isImportActive}" href="{base}/import">
      Import
    </a>
    <a class="item {isPositiveActive}" href="{base}/positive">
      Positive List
      <div class="floating ui blue label {isPositiveShow}">{positiveCount}</div>
    </a>
    <a class="item {isNegativeActive}" href="{base}/negative">
      Negative List
      <div class="floating ui red label {isNegativeShow}">{negativeCount}</div>
    </a>
    <a class="item {isCommandActive}" href="{base}/command">
      Command
    </a>
    <a class="item {isAboutActive}" href="{base}/about">
      About
    </a>
  </div>
  <hr>
</div>

<slot />

<style>
  .container {
    margin: 15px;
  }
  .title-space {
    margin-right: 20px;
  }
  .no-display {
    display: none;
  }
</style>