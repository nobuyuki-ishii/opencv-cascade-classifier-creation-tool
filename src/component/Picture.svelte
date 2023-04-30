<script lang="ts">
  import { base } from "$app/paths";
	import { afterUpdate, onDestroy } from "svelte";
	import type { Unsubscriber } from "svelte/store";
  import { resultListStore, selectedIndexStore, selectedBeforeIndexStore } from "../stores";

  let startX: number;
  let startY: number;
  let endX: number;
  let endY: number;

  let rectX: number;
  let rectY: number;
  let rectWidth: number;
  let rectHeight: number;

  afterUpdate(() => {
    if ($resultListStore == undefined || $resultListStore.length == 0) {
      document.querySelector("#no-picture")?.classList.remove("no-display");
      return;
    }
    document.querySelector("#no-picture")?.classList.add("no-display");

    addSvgEventMain();
  });

  function addSvgEventMain() {
    addSvgEvent();
  }

  function addSvgEvent() {
    for (let i: number = 0; i < $resultListStore.length; i++) {
      const promise = new Promise(function(resolve) {
        let pic: any = document.querySelector("#pic-" + i);

        pic.onload = function() {
          pic = document.querySelector("#pic-" + i);
          const svg: any = document.querySelector("#svg-" + i);

          // svgの大きさ設定
          svg.style.width  = pic.width;
          svg.style.height = pic.height;

          svg.addEventListener("mousedown", function(event: any) {
            // 左クリックのみ
            if(event.button != 0) return;

            startX = event.offsetX;
            startY = event.offsetY;
            console.log("[" + startX + ", " + startY + "]");
        
            svg.addEventListener("mousemove", mouseMoveEvent);
            svg.addEventListener("mouseup", mouseUpEvent);
          });

        }
      });
    }
  }

  afterUpdate(() => {
    showPicture();
  });

  let unsubscribe: Unsubscriber = selectedBeforeIndexStore.subscribe(selectedBeforeIndex => {
    if (selectedBeforeIndex == undefined) return;

    const pic: any = document.querySelector("#pic-" + selectedBeforeIndex);
    const svg: any = document.querySelector("#svg-" + selectedBeforeIndex);

    if (pic == null) return;

    pic.classList.add("no-display");
    svg.classList.add("no-display");
  });
  onDestroy(unsubscribe);

  unsubscribe = selectedIndexStore.subscribe(selectedIndex => {
    if (selectedIndex == undefined) return;

    const pic: any = document.querySelector("#pic-" + selectedIndex);
    const svg: any = document.querySelector("#svg-" + selectedIndex);

    if (pic == null) return;

    pic.classList.remove("no-display");
    svg.classList.remove("no-display");
  });
  onDestroy(unsubscribe);

  function mouseMoveEvent(event: any): void {
    draw(event);
  }

  function mouseUpEvent(event: any): void {
    if (rectX == rectY) {
      // 四角を描いていない場合、何もせず終了
      const svg: any = document.querySelector("#svg-" + $selectedIndexStore);
      svg.removeEventListener("mousemove", mouseMoveEvent);
      svg.removeEventListener("mouseup", mouseUpEvent);
      return;
    }

    $resultListStore[$selectedIndexStore]["rectList"].push([rectX, rectY, rectWidth, rectHeight]);
    $resultListStore = $resultListStore;
    console.log($resultListStore);

    const svg: any = document.querySelector("#svg-" + $selectedIndexStore);
    svg.removeEventListener("mousemove", mouseMoveEvent);
    svg.removeEventListener("mouseup", mouseUpEvent);
    // rectはPictureで描画されるので、描画用に生成したrectは削除する
    svg.removeChild(svg.lastChild);

    console.log("[" + startX + ", " + startY + ", " + endX + ", " + endY + "]");

    // 初期化
    startX = 0;
    startY = 0;
    endX   = 0;
    endY   = 0;
    rectX  = 0;
    rectY  = 0;
    rectWidth  = 0;
    rectHeight = 0;
  }

  function showPicture(): void {
    if ($selectedIndexStore == undefined) return;

    const pic: any = document.querySelector("#pic-" + $selectedIndexStore);
    const svg: any = document.querySelector("#svg-" + $selectedIndexStore);

    if (pic == null) return;

    pic.classList.remove("no-display");
    svg.classList.remove("no-display");
  }

  // 四角を描画する
  function draw(event: any) {
    endX = event.offsetX;
    endY = event.offsetY;

    // 四角になっていない場合、無視
    if (startX == endX || startY == endY) return;

    if (startX < endX && startY < endY) {
      rectX = startX;
      rectY = startY;
      rectWidth = endX - startX;
      rectHeight = endY - startY;
    } else if (startX < endX && startY > endY) {
      rectX = startX;
      rectY = endY;
      rectWidth = endX - startX;
      rectHeight = startY - endY;
    } else if (startX > endX && startY < endY) {
      rectX = endX;
      rectWidth = startX - endX;
      rectY = startY;
      rectHeight = endY - startY;
    } else if (startX > endX && startY > endY) {
      rectX = endX;
      rectWidth = startX - endX;
      rectY = endY;
      rectHeight = startY - endY;
    }

    drawRect();
  }

  // svg rectを追加する
  function drawRect(): void {
    const svg: any = document.querySelector("#svg-" + $selectedIndexStore);
    let rect = document.querySelector("#rect-" + $selectedIndexStore + "-" + $resultListStore[$selectedIndexStore]["rectList"].length);
    if (rect == null) {
      // svgはcreateElementNSを使わないと動的に描画がされない
      rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.id = "rect-" + $selectedIndexStore + "-" + $resultListStore[$selectedIndexStore]["rectList"].length;
      rect.setAttribute("x", String(rectX));
      rect.setAttribute("y", String(rectY));
      rect.setAttribute("width", String(rectWidth));
      rect.setAttribute("height", String(rectHeight));
      rect.setAttribute("stroke", "white");
      rect.setAttribute("stroke-width", 2);
      rect.setAttribute("fill", "transparent");
      svg.appendChild(rect);
    } else {
      // update
      rect.setAttribute("x", String(rectX));
      rect.setAttribute("y", String(rectY));
      rect.setAttribute("width", String(rectWidth));
      rect.setAttribute("height", String(rectHeight));
    }
  }
</script>

<div id="no-picture">
  <p>このアプリの使い方は<a href="{base}/about">こちら</a></p>
  <p>写真の読み込みは<a href="{base}/import">こちら</a></p>
</div>

<div style="position: relative;">
  {#if $resultListStore != undefined}
    {#each $resultListStore as result, i}
      <img id="pic-{String(i)}" src={result["filePath"]} class="no-display" alt="{result["filePath"]}" draggable="false"/>
      <svg id="svg-{String(i)}" class="no-display">
      {#each $resultListStore[i]["rectList"] as rectList, j}
        <rect id="rect-{String(i)}-{String(j)}" x="{rectList[0]}" y="{rectList[1]}" width="{rectList[2]}" height="{rectList[3]}" stroke="white" stroke-width="2" fill="transparent"></rect>
      {/each}
      </svg>
    {/each}
  {/if}
</div>

<style>
  #no-picture {
    margin-top: 50px;
    margin-bottom: 350px;
  }
  .no-display {
    display: none;
  }
  svg {
    position: absolute;
    top: 0px;
    left: 0px;
  }
</style>